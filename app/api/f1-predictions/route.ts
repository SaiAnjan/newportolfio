import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// POST: Save a prediction
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { finishOrder, dnfs, fastestLap, finalLeader, finalLeaderPoints, isTie } = body;

    // Validate required fields
    if (!finishOrder || !Array.isArray(finishOrder)) {
      return NextResponse.json(
        { error: 'finishOrder is required and must be an array' },
        { status: 400 }
      );
    }

    if (!dnfs || !Array.isArray(dnfs)) {
      return NextResponse.json(
        { error: 'dnfs is required and must be an array' },
        { status: 400 }
      );
    }

    if (!finalLeader || typeof finalLeader !== 'string') {
      return NextResponse.json(
        { error: 'finalLeader is required' },
        { status: 400 }
      );
    }

    // Get client info (optional)
    const userAgent = request.headers.get('user-agent') || null;
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      null;

    // Insert prediction
    const { data, error } = await supabase
      .from('f1_predictions')
      .insert({
        finish_order: finishOrder,
        dnfs: dnfs,
        fastest_lap: fastestLap || null,
        final_leader: finalLeader,
        final_leader_points: finalLeaderPoints || 0,
        is_tie: isTie || false,
        user_agent: userAgent,
        ip_address: ipAddress,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving prediction:', error);
      return NextResponse.json(
        { error: 'Failed to save prediction', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET: Fetch aggregated predictions
export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch all predictions
    const { data: predictions, error } = await supabase
      .from('f1_predictions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching predictions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch predictions', details: error.message },
        { status: 500 }
      );
    }

    if (!predictions || predictions.length === 0) {
      return NextResponse.json({
        total: 0,
        aggregates: {
          finalLeader: {},
          fastestLap: {},
          positionAverages: {},
          dnfs: {},
        },
      });
    }

    // Aggregate data
    const finalLeaderCounts: Record<string, number> = {};
    const fastestLapCounts: Record<string, number> = {};
    const positionCounts: Record<number, Record<string, number>> = {};
    const dnfCounts: Record<string, number> = {};

    // Initialize position counts for positions 1-20
    for (let i = 1; i <= 20; i++) {
      positionCounts[i] = {};
    }

    predictions.forEach((pred) => {
      // Count final leaders
      if (pred.final_leader) {
        finalLeaderCounts[pred.final_leader] = (finalLeaderCounts[pred.final_leader] || 0) + 1;
      }

      // Count fastest lap
      if (pred.fastest_lap) {
        fastestLapCounts[pred.fastest_lap] = (fastestLapCounts[pred.fastest_lap] || 0) + 1;
      }

      // Count positions
      if (pred.finish_order && Array.isArray(pred.finish_order)) {
        pred.finish_order.forEach((entry: { position: number; driver: string }) => {
          if (entry.position && entry.driver) {
            const pos = entry.position;
            if (pos >= 1 && pos <= 20) {
              positionCounts[pos][entry.driver] = (positionCounts[pos][entry.driver] || 0) + 1;
            }
          }
        });
      }

      // Count DNFs
      if (pred.dnfs && Array.isArray(pred.dnfs)) {
        pred.dnfs.forEach((driver: string) => {
          dnfCounts[driver] = (dnfCounts[driver] || 0) + 1;
        });
      }
    });

    const total = predictions.length;

    // Calculate averages (percentages)
    const finalLeaderPercentages: Record<string, number> = {};
    Object.keys(finalLeaderCounts).forEach((driver) => {
      finalLeaderPercentages[driver] = (finalLeaderCounts[driver] / total) * 100;
    });

    const fastestLapPercentages: Record<string, number> = {};
    Object.keys(fastestLapCounts).forEach((driver) => {
      fastestLapPercentages[driver] = (fastestLapCounts[driver] / total) * 100;
    });

    const positionPercentages: Record<number, Record<string, number>> = {};
    Object.keys(positionCounts).forEach((posStr) => {
      const pos = parseInt(posStr);
      positionPercentages[pos] = {};
      Object.keys(positionCounts[pos]).forEach((driver) => {
        positionPercentages[pos][driver] = (positionCounts[pos][driver] / total) * 100;
      });
    });

    const dnfPercentages: Record<string, number> = {};
    Object.keys(dnfCounts).forEach((driver) => {
      dnfPercentages[driver] = (dnfCounts[driver] / total) * 100;
    });

    return NextResponse.json({
      total,
      aggregates: {
        finalLeader: finalLeaderPercentages,
        fastestLap: fastestLapPercentages,
        positionAverages: positionPercentages,
        dnfs: dnfPercentages,
      },
      rawCounts: {
        finalLeader: finalLeaderCounts,
        fastestLap: fastestLapCounts,
        positions: positionCounts,
        dnfs: dnfCounts,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



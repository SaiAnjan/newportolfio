import { WaveproReportLoader } from "@/components/wavepro-report-loader";
import styles from "./page.module.css";

export default function WaveproReportPage() {
  return (
    <main className={styles.root}>
      <WaveproReportLoader />
    </main>
  );
}

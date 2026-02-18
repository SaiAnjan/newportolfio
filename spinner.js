#!/usr/bin/env node

const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const intervalMs = 80;
const durationMs = 4000;

let frameIndex = 0;

const intervalId = setInterval(() => {
  process.stdout.write(`\r${frames[frameIndex]} Thinking...`);
  frameIndex = (frameIndex + 1) % frames.length;
}, intervalMs);

const stop = () => {
  clearInterval(intervalId);
  process.stdout.write("\r✔ Done          \n");
};

setTimeout(stop, durationMs);

process.on("SIGINT", () => {
  stop();
  process.exit(0);
});

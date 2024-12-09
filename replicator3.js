const fs = require('fs');

if (process.argv.length !== 3) {
  console.error('Usage: node processSchedule.js <file>');
  process.exit(1);
}

const file = process.argv[2];
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const result = [];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

data.forEach((day) => {
  const dayName = day.day;
  const schedule = day.schedule;

  if (dayName === 'Sunday') {
    result.push({
      Day: dayName,
      Schedule: schedule,
    });
  } else {
    const repeatedPrograms = schedule.filter((program) => program.Repeats && program.Repeats.includes(dayName));
    if (repeatedPrograms.length > 0) {
      result.push({
        Day: dayName,
        Schedule: repeatedPrograms,
      });
    }
  }
});

console.log(JSON.stringify(result, null, 2));

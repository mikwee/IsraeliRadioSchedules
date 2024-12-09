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

    const nonRepeatedPrograms = schedule.filter((program) => !program.Repeats);
    const repeatedPrograms = schedule.filter((program) => program.Repeats);

    if (dayName === 'Sunday') {
        result.push({
            Day: dayName,
            Schedule: schedule,
        });
    }

    repeatedPrograms.forEach((program) => {
        program.Repeats.forEach((repeatedDay) => {
            if (repeatedDay !== dayName) {
                const existingDay = result.find((day) => day.Day === repeatedDay);
                if (existingDay) {
                    existingDay.Schedule.push(program);
                } else {
                    result.push({
                        Day: repeatedDay,
                        Schedule: [program],
                    });
                }
            }
        });
    });
});

console.log(JSON.stringify(result, null, 2));

const fs = require('fs');

// Function to process the input JSON and generate the output
function processSchedule(input) {
    const output = [];
    const daysMap = {};

    // Process each day's schedule
    input.forEach(entry => {
        const day = entry.day;
        const schedule = entry.schedule;

        // Add the main day entry if it doesn't exist
        if (!daysMap[day]) {
            daysMap[day] = {
                Day: day,
                Schedule: []
            };
            console.log(daysMap[day]);
            output.push(daysMap[day]);
        }

        // Add the schedule for the current day
        schedule.forEach(item => {
            daysMap[day].Schedule.push({
                Name: item.Name,
                Start: item.Start,
                End: item.End,
                Description: item.Description
            });
        });

        // Handle repeats
        if (schedule.some(item => item.Repeats)) {
            schedule.forEach(item => {
                if (item.Repeats) {
                    item.Repeats.forEach(repeatDay => {
                        if (!daysMap[repeatDay]) {
                            daysMap[repeatDay] = {
                                Day: repeatDay,
                                Schedule: []
                            };
                            output.push(daysMap[repeatDay]);
                        }
                        daysMap[repeatDay].Schedule.push({
                            Name: item.Name,
                            Start: item.Start,
                            End: item.End,
                            Description: item.Description
                        });
                    });
                }
            });
        }
    });

    return output;
}

// Main function to read input and output the result
function main() {
    const inputFilePath = process.argv[2];

    if (!inputFilePath) {
        console.error('Please provide the path to the input JSON file.');
        process.exit(1);
    }

    // Read the input JSON file
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            process.exit(1);
        }

        try {
            const inputJson = JSON.parse(data);
            const outputJson = processSchedule(inputJson);
            console.log(JSON.stringify(outputJson, null, 4));
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            process.exit(1);
        }
    });
}

// Run the main function
main();

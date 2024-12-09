# Israeli Radio Schedules
Since Israeli radio stations do not offer an open API, this repository is meant to be a makeshift. This is a repository of JSON files that represent radio schedules. Everyone is free to contribute.

## Schema
Schedules have to comply with the following [JSON schema](https://json-schema.org/):
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "day": {
        "type": "string"
      },
      "schedule": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "Name": {
              "type": "string"
            },
            "Start": {
              "type": "string"
            },
            "End": {
              "type": "string"
            },
            "Description": {
              "type": "string"
            },
            "Repeats": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "Name",
            "Start",
            "End",
            "Description"
          ]
        }
      }
    },
    "required": [
      "day",
      "schedule"
    ]
  }
}
```

## License
All data here is licensed under [Creative Commons Zero 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

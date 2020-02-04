# NODE DOCKER MYSQL CONTAINER

## Start Containers

Run

```
sh run.sh
```

## Password Information

Look in the docker-compose.yml file to find all the mysql password info.  Because I am using mysql version 8 you have to use the mysql workbench and will not be able to use sqlpro.

## Debug VS Code

1. Go to the run_node.sh and change the file to text below.

```
npm run dev:debug
```

2. Run command below

```
sh run.sh
```

3. Open chrome://inspect

4. Under Remote Target click inspect

5. Attach debugger in vs code

6. Click on the debug icon

7. Click the play button and attached debugger

## Examples

This is validating objects with nested and array nested properties.  Not that the 
@Type is required and @ValidatedNested is required as well

Not this is with defaultErrorHandler turned off and I created some custom middleware to process the errors.

Classes
```
import {
  IsEmail,
  Length,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import 'reflect-metadata';
import { Type } from 'class-transformer';

export class Blue {
  @IsNumber()
  color: number;
}

export class Part {
  @Length(3, 5)
  @IsNotEmpty()
  name: string;

  @Length(3, 5)
  @IsNotEmpty()
  day: string;

  @ValidateNested()
  @Type(() => Blue)
  fun: Blue;
}

export class LoginModel {
  @IsEmail()
  public email: string;

  @Length(5, 30)
  public password: string;

  @ValidateNested()
  @Type(() => Part)
  public part: Part;

  @ValidateNested({
    each: true,
  })
  @Type(() => Part)
  public parts: Part[];
}
```

JSON 

```
{
    "email": "fake@gmail.com",
    "password": "3333333",
    "part": {
        "day": "2334",
        "name": "sd",
        "fun": {
            "color": "fish"
        }
    },
    "parts": [
        {
            "day": "23423",
            "name": "23",
            "fun": {
                "color": "moo"
            }
        },
        {
            "day": "23423",
            "name": "23",
            "fun": {
                "color": 333
            }
        }
    ]
}
```

Response JSON
```
{
    "meta": {
        "type": "form_errors"
    },
    "data": [
        {
            "field_name": "part_name",
            "value": "sd",
            "error_messages": {
                "length": "name must be longer than or equal to 3 characters"
            }
        },
        {
            "field_name": "part_fun_color",
            "value": "fish",
            "error_messages": {
                "isNumber": "color must be a number conforming to the specified constraints"
            }
        },
        {
            "field_name": "parts_0_name",
            "value": "23",
            "error_messages": {
                "length": "name must be longer than or equal to 3 characters"
            }
        },
        {
            "field_name": "parts_0_fun_color",
            "value": "moo",
            "error_messages": {
                "isNumber": "color must be a number conforming to the specified constraints"
            }
        },
        {
            "field_name": "parts_1_name",
            "value": "23",
            "error_messages": {
                "length": "name must be longer than or equal to 3 characters"
            }
        }
    ]
}
```

## Example Always Use Expose

Note that in start.ts excludeExtraneousValues is set to true.  This cleans out bad values and makes everything more secure.

```
export class LoginModel {
  
  @IsEmail()
  @Expose()
  public email: string;

  @Length(5, 30)
  @Expose()
  public password: string;
}

```

Example JSON Request

```
{
    "email": "fake@gmail.com",
    "password": "3333333",
    "crap": 3333
}
```

Example Transformed Response

```
{
    "email": "fake@gmail.com",
    "password": "3333333"
}
```

## TODOs

1. Get all error handling and logging done
2. Finish all the user routes for the api
3. Get Swagger working with the api
4. Get Stripe working with the api
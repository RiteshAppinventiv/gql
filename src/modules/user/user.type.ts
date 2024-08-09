import { Field, ID, ObjectType } from "@nestjs/graphql";

// Define an object type for the error structure
@ObjectType('ErrorDetails')
export class ErrorDetails {
    @Field({ nullable: true }) // Optional status code
    statusCode?: number;

    @Field({ nullable: true }) // Optional error message
    error?: string;

    @Field({ nullable: true }) // Optional detailed message
    message?: string;

    @Field({ nullable: true }) // Optional error type
    type?: string;

    @Field({ nullable: true }) // Optional request path
    path?: string;

    @Field({ nullable: true })
    deviceType?: string; // Making email optional

    @Field({ nullable: true }) // Optional password field
    deviceId?: string;

    @Field({ nullable: true }) // Optional password field
    timeZone?: string;

    @Field({ nullable: true }) // Optional status code
    language?: string; // Use a number for the status code
}

// Define the ExError class with a specific error field
@ObjectType('ExError')
export class ExError {
    @Field(() => ErrorDetails, { nullable: true }) // Reference the ErrorDetails type
    error?: ErrorDetails; // Use ErrorDetails for the error property
}

// Define the UserRegisterType class extending ExError
@ObjectType('UserRegisterType')
export class UserRegisterType extends ExError {
    @Field(type => ID, { nullable: true })
    id?: string;

    @Field({ nullable: true })
    email?: string; // Making email optional

    @Field({ nullable: true }) // Optional password field
    password?: string;

    @Field({ nullable: true }) // Optional age field
    age?: number;

    @Field({ nullable: true }) // Optional status code
    statusCode?: number; // Use a number for the status code
}

// Define the UserLoginType class
@ObjectType('UserLoginType')
export class UserLoginType extends ExError {
    @Field({ nullable: true })
    email?: string; // Making email optional

    @Field({ nullable: true }) // Optional password field
    password?: string;

    @Field({ nullable: true }) // Make token optional
    token?: string;

    @Field({ nullable: true }) // Optional status code
    statusCode?: number; // Use a number for the status code

    // constructor(email: string, password: string, token?: string) {
    //     this.email = email;
    //     this.password = password;
    //     this.token = token;
    // }
}

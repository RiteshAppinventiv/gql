import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ExError } from "../user/user.type";


// Define the AdminLoginType class
@ObjectType("AdminLoginType")  // Removed the string argument to avoid signature mismatch
export class AdminLoginType extends ExError {
    @Field({ nullable: true })
    _id?: string; // Making email optional

    @Field({ nullable: true })
    email?: string; // Making email optional

    @Field({ nullable: true }) // Optional password field
    password?: string;

    @Field({ nullable: true }) // Optional status code
    statusCode?: number; // Use a number for the status code


    @Field({ nullable: true }) // Optional password field
    fullName?: string;

    @Field({ nullable: true }) // Optional password field
    userType?: string;

    @Field({ nullable: true }) // Optional password field
    status?: string;

    @Field({ nullable: true }) // Optional password field
    created?: number;

    @Field({ nullable: true }) // Optional password field
    accessToken?: string;

    @Field({ nullable: true }) // Optional password field
    refreshToken?: string;

}

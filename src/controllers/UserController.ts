import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa';
import { UserResponses } from '../models/responses/userResponses';
import { UsersService, UserCreationParams } from '../services/userServices';

@Route('users')
export class UserController extends Controller {
    
    @Get('{userId}')
    public async getUser(
        @Path() userId: number,
        @Query() name?:string
    ): Promise<UserResponses> {
        return new UsersService().get(userId, name)
    }

    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        let result = new UsersService().create(requestBody);
        console.log(result)
        return;
    }
}
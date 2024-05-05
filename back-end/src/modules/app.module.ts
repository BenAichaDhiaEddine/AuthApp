import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import * as dotenv from 'dotenv';
import { AuthController } from 'src/controllers/auth.controller';
import { UserService } from 'src/services/user.service';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [UserService],
})
export class AppModule {}

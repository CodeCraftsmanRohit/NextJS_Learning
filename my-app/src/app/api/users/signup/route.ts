import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse,NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';


export async function POST(request: NextRequest) {

    try {

        const reqBody=await request.json();

        const {username,email,password}=reqBody;

        console.log(reqBody);

        //check if user already exists
        const existingUser=await User.findOne({email:email});

        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400});
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //create new user
        const newUser=new User({
              username,
            email,
            password:hashedPassword
        });

       const savedUser=await newUser.save();

       console.log("Saved User:", savedUser);

        return NextResponse.json({message:"User created successfully",savedUser},{status:201});



    }catch (error: any) {

        return NextResponse.json({message: error.message},{status:500});

    }

}



connect();
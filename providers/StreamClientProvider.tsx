"use client"

import { ReactNode, useEffect, useState } from "react";
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = "user-id";
// const token = "authentication-token";
// const user: User = { id: userId };

const MyApp = ({children}:{children:ReactNode}) => {

    const [vedioClient,setVedioClient]=useState<StreamVideoClient>();

    const {user,isLoaded} = useUser();

    useEffect(()=>{
        if(!isLoaded || !user) return;
        if(!apiKey) throw new Error('Stream API key missing')

        const client = new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user?.username || user?.id,
                image:user?.imageUrl,

            },
            tokenProvider,
        })
        setVedioClient(client);
    },[user,isLoaded]);

    if(!vedioClient) return <Loader/>

    return (
    <StreamVideo client={vedioClient}>
        {children}
    </StreamVideo>
  );
};

export default MyApp;
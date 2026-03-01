//@ts-nocheck

"use client"

import { useGetCalls } from '@/hooks/UseGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingsCard from './MeetingsCard';
import Loader from './Loader';
import { toast } from 'sonner';

const CallList = ({type}:{type:'ended'|'upcoming' | 'recordings'}) => {


const {endedCalls,upcomingCalls,callRecordings,isLoading} = useGetCalls();

    const router = useRouter();
    const [recordings,setRecordings] = useState<CallRecording[]>([])
    const getCalls = ()=>{
        switch(type){
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }
    const getNoCallsMessages = ()=>{
        switch(type){
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Previous Recordings';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';
        }
    }

    useEffect(()=>{
        const fethcRecordings = async()=>{

            
            try {
            const callData = await Promise.all(callRecordings.map((meeting)=> meeting.queryRecordings()))
            
            const recordings = callData
            .filter(call=> call.recordings.length > 0)
            .flatMap(call => call.recordings);
            setRecordings(recordings);
                
            }
             catch (error) {
                toast("Try Again Later")
            }
            }
            if(type === 'recordings') fethcRecordings();
        },[type,callRecordings])


    const calls = getCalls();
    const noCalls = getNoCallsMessages();
    if(isLoading)return <Loader/>


  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording )=>(
            <MeetingsCard
            key={(meeting as Call).id}
              title={(meeting as Call).state?.custom?.description?.substring(0,20) || meeting?.filename?.substring(0,20) || 'Personal Meetings'}
                date={(meeting as Call).state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString() }
                icon = {
                    type == 'ended'
                    ? '/icons/previous.svg'
                    : type === 'upcoming' ?
                    '/icons/upcoming.svg':
                    '/icons/recordings.svg'
                }
                isPreviousMeeting = {type === 'ended'}
                buttonIcon1 = {type === 'recordings' ? '/icons/play.svg' : undefined}
                buttonText = {type === 'recordings' ? 'Play' : 'Start'}

                handleClick = {type === 'recordings' ? ()=> router.push(`${meeting.url}`):()=> router.push(`meeting/${meeting.id}`)}

                link = {type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
            
            />
        )) : <p>{noCalls}</p>
        }
    </div>
  )
}

export default CallList
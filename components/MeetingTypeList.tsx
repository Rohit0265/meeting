"use client"

import Image from "next/image"
import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Meetingmodel from "./Meetingmodel"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from 'react-datepicker'
import { Input } from "./ui/input"
const MeetingTypeList = () => {

    const router = useRouter();

    const [meeting,setMeeting] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

        const {user} = useUser();
        const client = useStreamVideoClient();
        const [values,setValues] = useState({
            dateTime :new Date(),
            description:'',
            link:''
        });
        const [callDetails,setCallDetails] = useState<Call>();

        const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    const createMeeting=async ()=>{


        if(!client || !user) return;

        try {
            if(!values.dateTime){
            toast("Please select a date and time")
            }  
            const id = crypto.randomUUID();
            const call = client.call('default',id);

            if(!call) throw new Error('Failed to create call')

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data:{
                    starts_at:startsAt,
                    custom:{
                        description
                    }
                }
            })

            setCallDetails(call);

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }

        toast("Meeting Created")

        } catch (error) {
            console.log(error);
            toast("Failed to create meeting")
        }
    }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>

        <HomeCard 
            img="/icons/add-meeting.svg"
            title="New Meeting"
            description="Start an instant meeting"
            handleClick={()=>setMeeting('isInstantMeeting')}
            className="bg-orange-1"
        />
        <HomeCard             
        img="/icons/schedule.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            handleClick={()=>setMeeting('isScheduleMeeting')}
            className="bg-blue-1"
            />
        <HomeCard 
            img="/icons/recordings.svg"
            title="View Recording"
            description="Cheeck out your recordings"
            handleClick={()=>router.push('/recordings')}
            className="bg-purple-1"
            />
        <HomeCard 
            img="/icons/join-meeting.svg"
            title="Join Meeting"
            description="Via invitation link"
            handleClick={()=>setMeeting('isJoiningMeeting')}
            className="bg-yellow-1"
            />

{!callDetails ? 
            (<Meetingmodel 
              isOpen={meeting === 'isScheduleMeeting'}
              onClose={() => setMeeting(undefined)}
              title="Create Meeting"
              className="text-center"
              buttonText="Create Meeting"
              handleClick={createMeeting} buttonIcon={""}>

                <div className="flex flex-col gap-2.5">
                    <label className="text-base text-normal leading-[22px] text-sky-2">
                        Add a description
                    </label>
                    <Textarea className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e)=>{
                        setValues({...values,description:e.target.value})
                    }}/>
                </div>
                <div className="flex w-full flex-col gap-2.5">
                    <label className="text-base text-noemal leading-[22px] text-sky-2">Select Date and Time</label>
                    <ReactDatePicker
                    selected={values.dateTime}
                    onChange={(date: Date | null)=>setValues({...values,dateTime:date!})}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full rounded bg-dark-2 p-2 focus-outline-none"
                    />
                </div>


              </Meetingmodel>              
            ):(
            <Meetingmodel 
                      isOpen={meeting === 'isScheduleMeeting'}
                      onClose={() => setMeeting(undefined)}
                      title="Meeting Created"
                      className="text-center"
                      handleClick={() => {
                          navigator.clipboard.writeText(meetingLink)
                          toast('Link Copied')

                      } }
                      image="/icons/checked.svg"
                      buttonIcon="/icons/copy.svg"
                      buttonText="Copy Meeting Link" children={undefined}            />
            )
            }

            <Meetingmodel 
              isOpen={meeting === 'isInstantMeeting'}
              onClose={() => setMeeting(undefined)}
              title="Start an Instant Meeting"
              className="text-center"
              buttonText="Start Meeting"
              handleClick={createMeeting} children={undefined} buttonIcon={""}                
            />


            <Meetingmodel 
              isOpen={meeting === 'isJoiningMeeting'}
              onClose={() => setMeeting(undefined)}
              title="SType the link here"
              className="text-center"
              buttonText="Join Meeting"
              handleClick={() => router.push(values.link)}
              >

                <Input
                placeholder="Meeting Link"
                className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e)=>setValues({...values,link:e.target.value})}
                />
              </Meetingmodel>

            
    </section>
  )
}

export default MeetingTypeList
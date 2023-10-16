"use client"
import { Modal } from "@/components/ui/modal";
import {UserButton} from "@clerk/nextjs";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage=()=>{
  const onOpen=useStoreModal((state)=>state.onOpen)
  const isOpen=useStoreModal((state)=>state.isOpen)

  // force the user not able to close this
  useEffect(()=>{
    if(!isOpen){
      onOpen()
    }
  },[isOpen, onOpen])

  return null
}

export default SetupPage

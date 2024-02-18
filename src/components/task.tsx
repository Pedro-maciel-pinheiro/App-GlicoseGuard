import { Feather } from "@expo/vector-icons"
import { View, Text, } from "react-native"


type TaskProps = {
    text: string | number
    dateTime: string
}

export default function Task(props: TaskProps) {
   
 
    return (
        <View className="mt-4 ">
            
                <View className="w-full border-2 border-slate-200  rounded-lg 
                flex-row justify-around items-center p-3">

                    <Text className="text-bold text-base  text-white">Glicose </Text>
                    <Text className="text-xl border-b border-red-700  text-white">{props.text} </Text>
                    
                    <Text className="text-base  text-white">{props.dateTime} </Text>
                    <Text >
                    <Feather name="activity" size={25} color={"red"} />
                    </Text>
                    
                </View>
            
        </View>
    )
}
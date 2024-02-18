import React, { useState, useEffect } from 'react';
import {
    Keyboard, Alert, View, ScrollView, TouchableOpacity,
    KeyboardAvoidingView, Platform, TextInput, Text, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import Task from '@/components/task';
import { Feather } from '@expo/vector-icons';
import Title from '@/components/title';



interface TaskItem {
    text: string;
    dateTime: string;
}

const Home: React.FC = () => {
    const [task, setTask] = useState<string | undefined>(undefined);
    const [taskItems, setTaskItems] = useState<TaskItem[]>([]);


    useEffect(() => {
        loadSavedData();
        console.log('Data loaded:', taskItems);
    }, []);


    const loadSavedData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('taskStore');
            if (jsonData) {
                const savedData: TaskItem[] = JSON.parse(jsonData);
                setTaskItems(savedData);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    };

    const saveData = async () => {
        try {
            const jsonData = JSON.stringify(taskItems);
            await AsyncStorage.setItem('taskStore', jsonData);
            console.log('Data saved:', taskItems);
        } catch (error) {
            console.error('Error saving data:', error);
        }

    };



    const handleAddTask = async () => {
        Keyboard.dismiss();
        if (task) {
            const dateTime = new Date();
            const formattedDateTime = format(dateTime, 'dd/MM');
            const newTaskItems: TaskItem[] = [...taskItems, { text: task, dateTime: formattedDateTime }];
            saveData();
            setTaskItems(newTaskItems);
            saveData();
        }

        setTask('');
    };

    const handleRemoveTask = (index: number) => {
        Alert.alert(
            'Remover Resultado',
            'Tem certeza de que deseja remover esta Resultado?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Remover', onPress: () => confirmRemoveTask(index) },
            ]
        );

    };

    const confirmRemoveTask = (index: number) => {
        let itemsCopy: TaskItem[] = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
        saveData();
    };


    return (

        <View className="flex-1 bg-blue-950 ">
            <Title />
            <View>
                <Image className='-z-10 absolute opacity-20'
                    source={require('./img/cat.webp')}
                />
            </View>
            <ScrollView>


                <Text>

                </Text>
                <View className="items-center ">

                    <View >

                        {taskItems.map((item, index) => (

                            <View key={index}>

                                <TouchableOpacity onPress={() => handleRemoveTask(index)}>

                                    <Task text={item.text} dateTime={item.dateTime} />

                                </TouchableOpacity>
                            </View>

                        ))}
                    </View>


                </View>
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="w-full h-24 absolute z-10 flex-row justify-around items-center 
                  bottom-0 pb-8 bg-blue-950 border-t-2 p-2 border-white ">


                <TextInput className="bg-slate-700 border-2 border-white rounded-full p-3 font-bold "
                    placeholder="Escreva o Resultado de Hoje"
                    keyboardType="numeric"
                    placeholderTextColor="white"
                    value={task} onChangeText={text => setTask(text)} />

                <TouchableOpacity className="bg-slate-700 border-2 border-white rounded-full w-14 h-14 items-center 
                   justify-center" onPress={handleAddTask}>
                    <View >
                        <Text >
                            <Feather name="plus" size={32} color={"white"} />

                        </Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>


    );
};

export default Home;

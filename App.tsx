import React, { useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  View,
} from "react-native";

const App = () => {

  // attached with each input onChangeText
  const [textValue, setTextValue] = useState('');
  // number of inputs, add length or decrease
  const [numInputs, setNumInputs] = useState(1);
  // input fields
  const refInputs = useRef<string[]>([textValue]);

  const setInputValue = (index: number, value: string) => {
    //store inputs to refInputs
    const inputs = refInputs.current;
    inputs[index] = value;
    //setting text value
    setTextValue(value);
  };

  const addInput = () => {
    //add new element
    refInputs.current.push('');
    //increase no of inputs
    setNumInputs(value => value + 1);
  };

  const removeInput = (i: number) => {
    //remove from array by index val
    refInputs.current.splice(i, 1)[0];
    //decrease no of inputs
    setNumInputs(value => value - 1);
  };

  const inputs: JSX.Element[] = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i}>
        <View style={styles.sectionContainer}>
          <Text style={styles.textBox}>{i + 1}.</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => setInputValue(i, value)}
            value={refInputs.current[i]}
            placeholder="Placeholder"
          />
          {/*to remove inputs*/}
          <Pressable onPress={() => removeInput(i)}>
            <Text style={styles.textBox}>Remove</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {inputs}
        <View style={styles.sectionContainer}>
          <Pressable onPress={addInput}>
            <Text style={styles.textBox}>+ Add</Text>
          </Pressable>
        </View>
        <View style={styles.displayContainer}>
          <Text>Value on Input: </Text>
          {refInputs.current.map((value, i) => {
            return <Text key={i}>{i + 1}  -  {value}</Text>
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
  },
  displayContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: 'center',
  },
  textBox: {
    justifyContent: 'center',
    borderColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  input: {
    borderColor: 'gray',
    width: '50%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

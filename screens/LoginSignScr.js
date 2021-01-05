import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase'
export default class LoginSignScr extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: ''
        }
    }

    login=async(email,password)=>{
        if (email && password){
          try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)
            if(response){
              this.props.navigation.navigate('Transaction')
            }
          }
          catch(error){
            switch (error.code) {
              case 'auth/user-not-found':
                Alert.alert("user dosen't exists")
                console.log("doesn't exist")
                break
              case 'auth/invalid-email':
                Alert.alert('incorrect email or password')
                console.log('invaild')
                break
            }
          }
        }
        else{
            Alert.alert('enter email and password');
        }
      }
    render() {


        return (
            <k
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>BOOKSANTA APP</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.textbox}
                        placeholder="enter email id"
                        keyboardType='email-address'
                        onChangeText={(text) => {
                            this.setState({ emailId: text })
                        }}
                    />
                    <TextInput
                        style={styles.textbox}
                        secureTextEntry={true}
                        placeholder="enter your password"
                        onChangeText={(text) => {
                            this.setState({ password: text })
                        }}
                    />
                    <TouchableOpacity 
                     style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7, alignItems:'center'}}
                     onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7, alignItems:'center'}}>
                        <Text>SignUp</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        color: '#a7f986',
        alignItems: 'center'
    },
    title:{
        justifyContent: 'center',
        color:'#ea3838',
        fontSize:65,
    },
    textbox:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor: '#ff8a65',
        margin:10,
        paddingLeft: 10
    }
})
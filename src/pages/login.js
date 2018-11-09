import React, { Component } from 'react'
import { View, Text, TextInput, Image, Button, StatusBar, AsyncStorage,Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { Styles } from '../utils/init-props';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'admin',
            password: 'admin123',
            initSplash: true,
            initLoading: false,
        }
    }

    componentWillMount() {

        AsyncStorage.getItem('ceklogin', (err, res) => {
            if (res == null) {
                setTimeout(() => {
                    this.setState({
                        initSplash: false
                    });
                    this.props.navigation.navigate('InitLogin');
                }, 2000);
            } else {
                setTimeout(() => {
                    this.setState({
                        initSplash: false
                    });
                    this.props.navigation.navigate('InitHome');
                }, 2000);
            }
        })

    }

    login() {
        this.setState({
            initLoading: true
        });

        AsyncStorage.multiSet([
            ['ceklogin', 'udah'],
            ['username', this.state.username],
            ['password', this.state.password]
        ]);

        setTimeout(() => {
            this.setState({
                initLoading: false
            });
            Alert.alert(
                'INFO',
                'Selamat datang di Open Class Programming',
                [
                  {text: 'Masuk', onPress: () => {
                      this.props.navigation.navigate('InitHome');
                  }},
                ],
                { cancelable: false }
              )
        }, 3000);
    }

    render() {
        if (this.state.initSplash) {
            return (
                <View style={Styles.global.home_wrapper}>
                    <StatusBar
                        backgroundColor="#000000"
                        barStyle="light-content"
                    />
                    <Image source={require('../assets/imgs/graduation.png')} style={{ width: 110, height: 110, marginTop: 180 }} />
                </View>
            )
        }

        return (
            <View style={Styles.global.home_wrapper2}>
                <StatusBar
                    backgroundColor="#bdc3c7"
                    barStyle="light-content"
                />
                <Spinner visible={this.state.initLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                <Image source={require('../assets/icon/login.png')} style={{ width: 110, height: 110, marginBottom: 60 }} />
                <View style={{ width: 240, height: 90 }}>
                    <TextInput
                        placeholder='Username'
                        underlineColorAndroid='transparent'
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username: username })}
                        style={{ backgroundColor: '#ffffff', borderRadius: 2, borderBottomColor: '#012E52', borderBottomWidth: 2 }}
                    />
                    <TextInput
                        placeholder='Password'
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password: password })}
                        style={{ marginBottom: 10, backgroundColor: '#ffffff', borderRadius: 2, borderBottomColor: '#012E52', borderBottomWidth: 2 }}
                    />
                    <Button onPress={() => this.login()} title='masuk' color='#bdc3c7' />
                    <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 8 }}>Open Class Programming</Text>
                </View>
            </View>
        );
    }
}

module.exports = Login
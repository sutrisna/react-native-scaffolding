import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import { Styles, Services } from '../utils/init-props';
import Spinner from 'react-native-loading-spinner-overlay';

class Input extends Component {

    static navigationOptions = {
        title: 'Input Data',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#95a5a6',
            elevation: 0
        },
        headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'sans-serif'
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            initLoading: false,
        }
    }

    submit() {

        if (this.state.title == '' || this.state.body == '') {
            alert('Silahkan isi dulu bro !');
        } else {
            this.setState({
                initLoading: true
            });
            
            let data = {
                title: this.state.title,
                body: this.state.body,
                userId: 1,
            }

            Services.setPosts(data).then(res => {
                this.setState({
                    initLoading: false
                });
                alert(JSON.stringify(res));
            }, err => {
                this.setState({
                    initLoading: false
                });
                alert(JSON.stringify(err));
            });
        }

    }

    render() {
        return (
            <View style={Styles.global.home_wrapper}>
                <Spinner visible={this.state.initLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                <Text style={{ fontFamily: 'sans-serif-medium', marginBottom: 30, color: '#000000' }}>Contoh Input Data</Text>
                <View style={{ width: 300, height: 90 }}>
                    <TextInput
                        placeholder='Title'
                        underlineColorAndroid='transparent'
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title: title })}
                        style={{ backgroundColor: '#ffffff', borderRadius: 2, borderBottomColor: '#012E52', borderBottomWidth: 2, marginBottom: 5 }}
                    />
                    <TextInput
                        {...this.props}
                        multiline={true}
                        numberOfLines={4}
                        editable={true}
                        placeholder='Isi'
                        underlineColorAndroid='transparent'
                        value={this.state.body}
                        onChangeText={(body) => this.setState({ body: body })}
                        style={{ backgroundColor: '#ffffff', borderRadius: 2, borderBottomColor: '#012E52', borderBottomWidth: 2, marginBottom: 10 }}
                    />
                    <Button onPress={() => this.submit()} title='kirim' color='#bdc3c7' />
                </View>
            </View>
        );
    }
}

module.exports = Input
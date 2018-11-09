import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Styles, Pipes } from '../utils/init-props';

class Detail extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('content').name,
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#95a5a6',
                elevation: 0
            },
            headerTitleStyle: {
                fontSize: 18,
                fontFamily: 'sans-serif'
            },
        }
    };

    constructor(props) {
        super(props)

        const { navigation } = this.props;

        this.state = {
            content: navigation.getParam('content'),
        }
    }

    pindahHalaman() {
        this.props.navigation.navigate('Input');
    }

    detailList() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={Styles.global.tulisan_type2}>{Pipes.uppercase(this.state.content.name)}</Text>
                <Text style={Styles.global.tulisan_type1}>{this.state.content.email}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={Styles.global.home_wrapper}>
                    {this.detailList()}
                </View>

                <TouchableOpacity
                    style={{ backgroundColor: '#bdc3c7', padding: 20,alignItems:'center' }}
                    onPress={() => this.pindahHalaman()}
                >
                    <Text style={Styles.global.tulisan_type2}>Halaman Input Data</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = Detail
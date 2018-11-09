import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, AsyncStorage, FlatList, ActivityIndicator, Image } from 'react-native';
import { Styles, Pipes, Services } from '../utils/init-props';

class Home extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            nama: '',
            initLoading: true,
            initRefreshing: false,
        }
    }

    componentDidMount() {
        this.setState({
            nama: 'trisna'
        });

        Services.getUsers().then(res => {
            this.setState({
                initLoading: false,
                dataSource: res,
            });
        }, err => {
            this.setState({
                initLoading: false
            });

            alert('Gagal mengambil data, cek koneksi internet anda !');
        });
    }

    pindahHalaman(data) {
        // alert(JSON.stringify(data)); // Untuk melihat data json pake alert
        this.props.navigation.navigate('Detail', {
            content: data
        });
    }

    logout() {
        AsyncStorage.multiRemove(['username', 'password', 'ceklogin']);
        this.props.navigation.navigate('InitLogin');
    }

    refresh() {
        this.setState({ initRefreshing: true });

        Services.getUsers().then(res => {
            this.setState({
                initRefreshing: false,
                dataSource: res,
            });
        }, err => {
            this.setState({
                initRefreshing: false
            });

            alert('Gagal mengambil data, cek koneksi internet anda !');
        });
    }

    render() {
        if (this.state.initLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>

                <View style={{ height:50, alignItems: 'center' }}>
                    <StatusBar
                        backgroundColor="#bdc3c7"
                        barStyle="light-content"
                    />

                    <Text style={Styles.global.tulisan_type1}>{Pipes.uppercase('open class programming')}</Text>

                    <TouchableOpacity
                        onPress={() => this.logout()}
                    >
                        <Text style={Styles.global.tulisan_type2}>LOGOUT</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1 }}>

                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => item.name}
                        refreshing={this.state.initRefreshing}
                        onEndReachedThreshold={0.5}
                        onRefresh={() => this.refresh()}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => {
                                        this.pindahHalaman(item)
                                    }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#E6ECEF' }}>
                                            <View style={{ flex: 1, alignItems: 'center' }} >
                                                <Image source={require('../assets/imgs/man.png')} style={{ width: 45, height: 45, margin: 5 }} />
                                            </View>
                                            <View style={{ flex: 4 }} >
                                                <Text style={{ fontFamily: 'sans-serif-medium', color: '#000000' }}>{item.name}</Text>
                                                <Text style={{ fontFamily: 'sans-serif-light', fontSize: 11, color: '#000000' }}>{item.email}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>

            </View>
        );
    }
}

module.exports = Home
import React, { Component, useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Picker,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Gallary from './GetImageFromGallary';
import firebase from '../firebase/firebase';
import Icon from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';
import AwesomeAlert from 'react-native-awesome-alerts';
const urlImageBookDefault =
  'https://banner2.cleanpng.com/20190623/koz/kisspng-electric-vehicle-car-illustration-motorcycle-5d0f60a0a6a6c9.5665388615612888646826.jpg';

const gallary = new Gallary();
export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageXe: null,
      ten: '',
      description: '',
      amout: '',
      gia: '',
      loaiXe: 'Xe số',
      showAlert: false,
      updateBook: this.props.route.params.book,
    };
  }

  componentDidMount = () => {
    const { updateBook } = this.state;
    if (updateBook) {
      this.setState({
        imageXe: updateBook.urlimageXe,
        ten: updateBook.ten,
        description: updateBook.description,
        amout: updateBook.amout,
        gia: updateBook.gia,
        loaiXe: updateBook.loaiXe,
      });
    }
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  _onHandleGetImage = async (type) => {
    const { imageXe } = this.state;
    if (imageXe == null) {
      let uri = null;
      if (type == 'Camera') {
        uri = await gallary.getImageFromGallary();
      } else uri = await gallary.getImageFromDevice();

      this.setState({
        imageXe: uri,
      });
    } else {
      this.setState({
        imageXe: null,
      });
    }
  };

  _deleteBook = () => {
    firebase
      .database()
      .ref('Book/' + this.state.updateBook.key)
      .remove()
      .then(() => {
        alert('Xóa hàng thành công !');
        this.props.navigation.navigate('Màn hình chính');
        this._clearFiled();
      })
      .catch((error) => alert(error.getMessage()));
  };

  _uploadImageToFirebase = () => {
    return gallary.uploadImageAsync(this.state.imageBook, 'book');
  };

  _clearFiled = () => {
    this.setState({
      imageXe: null,
      ten: '',
      description: '',
      amout: '',
      gia: '',
      loaiXe: 'Xe số',
      updateBook: null,
    });
  };

  _onHandleAddBook = async (book) => {
    book.urlImageBook = await this._uploadImageToFirebase();

    if (!book.urlImageBook) book.urlImageBook = urlImageBookDefault;

    firebase
      .database()
      .ref('Book')
      .push()
      .set({ book })
      .then(() => {
        alert('Thêm hàng thành công !');
        this._clearFiled();
      })
      .catch((error) => alert(error.getMessage()));
  };

  _onHandleUpdateBook = async (book) => {
    firebase
      .database()
      .ref('Book/' + this.state.updateBook.key)
      .update({ book })
      .then(() => {
        alert('Sửa hàng thành công !');
        this._clearFiled();
      })
      .catch((error) => alert(error.getMessage()));
  };


  render() {
    const {
      ten,
      description,
      amout,
      gia,
      loaiXe,
      imageXe,
      updateBook,
      showAlert,
    } = this.state;
    const chooseImage = imageXe ? 'Xóa hình' : 'Chọn hình';
    const items = [
      {
        label: 'Xe số',
        value: 'Xe số',
      },
      {
        label: 'Xe tay ga',
        value: 'Xe tay ga',
      },
      {
        label: 'Xe côn tay',
        value: 'Xe côn tay',
      },
      {
        label: 'Phân khối lớn',
        value: 'Phân khối lớn',
      },
    ];

    const button = updateBook ? 'Sửa' : 'Thêm';
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Text style={[styles.text, styles.title]}>Thêm Hàng</Text>
          <View style={styles.viewImage}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                if (imageXe) {
                  this._onHandleGetImage('');
                } else {
                  this.showAlert();
                }
              }}>
              <Text style={styles.text}>{chooseImage}</Text>
            </TouchableHighlight>
            {imageXe && (
              <Image source={{ uri: imageXe }} style={styles.image} />
            )}
          </View>
          <TextInput
            style={styles.input}
            value={ten}
            placeholder="Tên Xe"
            onChangeText={(text) => {
              this.setState({ ten: text });
            }}
          />

          <TextInput
            style={styles.input}
            value={description}
            placeholder="Mô tả"
            onChangeText={(text) => {
              this.setState({ description: text });
            }}
          />
           <TextInput
            style={styles.input}
            value={amout}
            placeholder="Số lượng"
            onChangeText={(text) => {
              this.setState({ amout: text });
            }}
          />
          <TextInput
            style={styles.input}
            value={gia}
            placeholder="Giá bán"
            onChangeText={(text) => {
              this.setState({ gia: text });
            }}
          />
          <Picker
            selectedValue={this.state.typeBook}
            style={styles.dropdown}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ typeBook: itemValue }, () => {
                console.log(this.state.typeBook);
              })
            }>
            {items.map((item, index) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              );
            })}
          </Picker>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableHighlight
              onPress={() => {
                const book = { ten, description, amout, gia, loaiXe };
                button == 'Thêm'
                  ? this._onHandleAddBook(book)
                  : this._onHandleUpdateBook(book);
              }}
              style={[styles.button, styles.buttonAddBook, { flex: 1 }]}>
              <Text style={styles.text}>{button}</Text>
            </TouchableHighlight>
            {button == 'Sửa' ? (
              <TouchableHighlight
                onPress={() => {
                  this._deleteBook();
                }}
                style={[styles.button, styles.buttonAddBook, { flex: 1 }]}>
                <Text style={styles.text}>Xóa</Text>
              </TouchableHighlight>
            ) : (
              []
            )}
          </View>
        </ScrollView>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Chọn hình ảnh"
          message="Bạn muốn lấy ảnh từ đâu ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Chọn camera"
          cancelButtonColor="#DD6B55"
          confirmText="Chọn thư viện"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
            this._onHandleGetImage('Gallary');
          }}
          onConfirmPressed={() => {
            this.hideAlert();
            this._onHandleGetImage('Camera');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 32,
    color: '#ff8d00',
    textShadowColor: 'black',
    textShadowOffset: {
      height: 2,
      width: 2,
    },
    textShadowRadius: 3,
  },
  viewImage: {
    flex: 1,
    marginTop: 10,
    resizeMode: 'cover',
  },
  image: {
    width: null,
    height: 200,
    borderRadius: 10,
    flex: 1,
    resizeMode: 'stretch',
  },
  button: {
    backgroundColor: '#841584',
    padding: 10,
    textAlign: 'center',
    alignSelf: 'flex-end',
    borderRadius: 20,
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    marginTop: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  dropdown: {
    padding: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative', // It was absolute
    width: '90%',
    alignSelf: 'center',
  },
  buttonAddBook: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
});
  
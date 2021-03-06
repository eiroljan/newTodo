import React from "react";
import {StyleSheet,Text,View,TouchableOpacity,FlatList,Modal,ActivityIndicator} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };
  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("something went wrong");
      }
      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });
      this.setState({ user });
    });
  }
  componentWillUnmount() {
    firebase.detach();
  }
  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  renderList = (list) => {
    return (
      <TodoList
        list={list}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );
  };
  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };
  onRemove = (id) => (e) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  updateList = (list) => {
    firebase.updateList(list);
  };
  deleteList = (list) => {
    firebase.deleteList(list);
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            <Text>ToDo</Text>
            <Text style={{ fontWeight: "300", color: 'gray' }}>List</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={16} color={'gray'} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
    
        <View style={{ height: 370, margin: 5 ,}}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            vertical={true}
            showsVerticalScrollIndicator={true}
            ItemSeparatorComponent={() => <View style={{ margin: 3 }} />}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    flex: 1,
    alignSelf: "center",
    marginTop:100,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64,
    marginTop:100,
  },
  addList: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop:30,
  },
  add: {
    color: 'gray',
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});

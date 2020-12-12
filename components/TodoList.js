import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import Colors from "../Colors";
import TodoModal from "./TodoModal";
import { AntDesign } from "@expo/vector-icons";

export default class TodoList extends React.Component {
  state = {
    showListVisible: false,
  };

  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }
  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    renderList = (list) => {
      return (
        <TodoList
          list={list}
          updateList={this.updateList}
          deleteList={this.deleteList}
        />
      );
    };
    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <TodoModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={{
            backgroundColor: list.color,
            paddingVertical: 16,
            borderRadius: 10,
            alignItems: "center",
            width: 360,
          }}
          onPress={() => this.toggleListModal()}
          onLongPress={() => this.props.deleteList(list)}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View style={styles.container}>
            <View style={styles.containers}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    width: 360,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: 'gray',
    marginBottom: 10,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: 'gray',
    alignItems: "center",
    alignContent: "center",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: 'gray',
    alignItems: "center",
    alignContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row-reverse",
    width: 300,
    justifyContent: "space-around",
  },
  
  containers: {
    alignItems: "center",
    justifyContent: "center",
  },
});

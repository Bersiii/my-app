import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ios = Platform.OS === "ios";

const Componenttext = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ios ? "padding" : "height"}
      keyboardVerticalOffset={ios ? 40 : 20}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Componenttext;

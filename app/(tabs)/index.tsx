import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { StyleSheet, TextInput, } from 'react-native';
import { ThemedButton } from '@/components/ui/themed-button';


export default function HomeScreen() {
  return (
    <ThemedView style={styles.mainContainer}>
      <ThemedText type='title'>Login</ThemedText>
      <ThemedView style={styles.form}>
        <ThemedText type='defaultSemiBold'>Username</ThemedText>
        <TextInput style={styles.inputBox} placeholder='Username' />
        <ThemedText type='defaultSemiBold'>Password</ThemedText>
        <TextInput style={styles.inputBox} placeholder='Password' secureTextEntry={true} />
        <ThemedButton title='Login' style={styles.submitBtn} textStyle={{ fontSize: 20 }} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  form: {
    width: '65%',
    alignItems: 'flex-start',
    gap: 10,
  },
  inputBox: {
    borderStyle: 'solid',
    borderColor: '#424242',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    color: '#a1a1a1',
  },
  submitBtn: {
    width: '100%',
    marginTop: 5,
  },
});

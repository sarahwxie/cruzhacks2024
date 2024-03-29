import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { ActivityIndicator, TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { FIREBASE_AUTH } from "../../FirebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)

  // manually added loading screen
  const [isLoading, setIsLoading] = React.useState(false)

  // add firebase auth
  const auth = FIREBASE_AUTH

  // SARAH: pull the exact values you need from the store
  // I FUCKING LOVE MOBX
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("sample@gmail.com")
    setAuthPassword("veronicaIsHomophobic")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  async function login() {
    setIsLoading(true)
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    try {
      const response = await signInWithEmailAndPassword(auth, authEmail, authPassword)
      console.log(JSON.stringify(response, undefined, 4))

      // If successful, reset the fields
      setIsSubmitted(false)
      setAuthPassword("")
      setAuthEmail("")

      // and set the token
      const token = await response.user.getIdToken()
      setAuthToken(token)
    } catch (e: any) {
      console.log(e)
      alert("Account creation failed: " + e.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function createAccount() {
    setIsLoading(true)
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    try {
      const response = await createUserWithEmailAndPassword(auth, authEmail, authPassword)
      console.log(JSON.stringify(response, undefined, 4))

      // If successful, reset the fields
      setIsSubmitted(false)
      setAuthPassword("")
      setAuthEmail("")

      // and set the token
      const token = await response.user.getIdToken()
      setAuthToken(token)
    } catch (e: any) {
      console.log(e)
      alert("Account creation failed: " + e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />
      {/* SARAH: I tested copilot refactoring here and it works really well */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Button
            testID="login-button"
            tx="loginScreen.createAccount"
            style={$tapButton}
            preset="reversed"
            onPress={createAccount}
          />
          <Button
            testID="create-account-button"
            tx="loginScreen.tapToSignIn"
            style={$tapButton}
            preset="reversed"
            onPress={login}
          />
        </>
      )}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Status from '../../magento/Status';
import { MessageView, Button, Text, TextInput } from '../../components'
import { resetPassword } from '../../store/actions';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

const ForgetPasswordScreen = ({
  status,
  errorMessage,
  navigation,
  resetPassword: _resetPassword,
}) => {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState('');

  const onResetPress = () => {
    _resetPassword(email);
  };

  const renderMessages = () => {
    const message = status === Status.ERROR ? errorMessage : status === Status.SUCCESS ? translate('forgetPasswordScreen.emailSent'): "";
    const type = status === Status.ERROR ? "error" : status === Status.SUCCESS ? "success" : "info";
    return (
      <MessageView
        message={message}
        type={type}
      />
    )
  };

  const renderButtons = () => (
    <Button
      loading={status === Status.LOADING}
      disabled={email === ''}
      onPress={onResetPress}
      title={translate('forgetPasswordScreen.buttonTitle')}
    />
  );

  return (
    <View style={styles.container(theme)}>
      <Text type="subheading" bold style={styles.title(theme)}>
        {translate('forgetPasswordScreen.passwordRecovery')}
      </Text>
      <Text style={styles.description}>
        {translate('forgetPasswordScreen.requestEmailId')}
      </Text>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder={translate('forgetPasswordScreen.emailHint')}
        autoCorrect={false}
        containerStyle={styles.emailOffset(theme)}
        value={email}
        editable={!status.LOADING}
        onSubmitEditing={onResetPress}
        onChangeText={setEmail}
      />
      {renderButtons()}
      {renderMessages()}
    </View>
  );
};

ForgetPasswordScreen.navigationOptions = {
  title: translate('forgetPasswordScreen.title'),
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    paddingTop: theme.spacing.extraLarge,
  }),
  title: theme => ({
    marginBottom: theme.spacing.medium,
  }),
  description: {
    textAlign: 'center',
  },
  emailOffset: theme => ({
    marginVertical: theme.spacing.large,
  })
});

ForgetPasswordScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
  resetPassword: PropTypes.func.isRequired,
};

ForgetPasswordScreen.defaultProps = {
  error: ' ',
};

const mapStateToProps = ({ auth }) => {
  const {
    resetPasswordStatus: status,
    resetPasswordErrorMessage: errorMessage,
  } = auth;

  return {
    status,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  resetPassword
})(ForgetPasswordScreen);
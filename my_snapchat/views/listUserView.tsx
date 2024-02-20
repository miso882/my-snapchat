import * as React from 'react';
import {View} from 'react-native';
import {ListUser} from '../components/listUsers';

export const ListUserView = ({navigation}) => {
  return (
    <View>
      <ListUser navigateur={navigation} />
    </View>
  );
};

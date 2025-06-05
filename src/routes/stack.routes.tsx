import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';
import { Register } from '../screens/Register';
import { Initial } from '../screens/Initial';
import { Build } from '../screens/Build';

import { ChooseCpu } from '../screens/ChooseComponents/ChooseCPU';
import { ChooseMotherboard } from '../screens/ChooseComponents/ChooseMotherBoard';
import { ChooseGpu } from '../screens/ChooseComponents/ChooseGPU';
import { ChooseMemory } from '../screens/ChooseComponents/ChooseMemory';
import { ChooseStorage } from '../screens/ChooseComponents/ChooseStorage';
import { ChooseCase } from '../screens/ChooseComponents/ChooseCase';
import { ChoosePsu } from '../screens/ChooseComponents/ChoosePSU';
import { SaveBuild } from '../screens/SaveBuild';
import { BuildDetails } from '../screens/BuildDetails';

const Stack = createStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Initial' component={Initial} />
      <Stack.Screen name='Build' component={Build} />
      <Stack.Screen name='SaveBuild' component={SaveBuild} />
      <Stack.Screen name='BuildDetails' component={BuildDetails} />

      <Stack.Screen name='ChooseCpu' component={ChooseCpu} />
      <Stack.Screen name='ChooseMotherboard' component={ChooseMotherboard} />
      <Stack.Screen name='ChooseMemory' component={ChooseMemory} />
      <Stack.Screen name='ChooseGpu' component={ChooseGpu} />
      <Stack.Screen name='ChooseStorage' component={ChooseStorage} />
      <Stack.Screen name='ChoosePsu' component={ChoosePsu} />
      <Stack.Screen name='ChooseCase' component={ChooseCase} />
    </Stack.Navigator>
  );
}
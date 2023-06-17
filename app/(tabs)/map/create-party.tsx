import {
  GeoSearchResult,
  GeoSearchType,
} from '@buf/jonas_clubben.bufbuild_es/search/v1/search_pb';
import { PlainMessage, Timestamp } from '@bufbuild/protobuf';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useTheme } from '@tamagui/core';
import { LinearGradient } from '@tamagui/linear-gradient';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'components/Button';
import ChipPicker from 'components/ChipPicker';
import { Input } from 'components/Input';
import LocationDisplay from 'components/LocationDisplay';
import { ScrollView } from 'components/ScrollView';
import { XStack, YStack, YStackProps } from 'components/Stacks';
import { Text } from 'components/Text';
import { partyClient } from 'data/apis/clients';
import {
  Stack as ExpoStack,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import Head from 'expo-router/head';
import { i18n, useI18n } from 'hooks/i18n';
import { Form, SetFormAction, useForm } from 'hooks/useForm';
import { useReverseGeocoding } from 'hooks/useReverseGeodings';
import React, { useEffect, useState } from 'react';
import { useColorScheme, Switch, ActivityIndicator } from 'react-native';
import { Region } from 'react-native-maps';
import { round } from 'utils/round';

type Steps = 1 | 2;
export type CreatePartyParams = {
  lat: string;
  lng: string;
};

type Address = {
  streetAddress: string;
  postalCode: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
};
type CreatePartyForm = {
  title: string;
  details: string;
  entryDate: Date;
  entryTime: Date;
  isPublic: boolean;
  minAge?: string;
  music: { selected: string[]; deselected: string[] };
  address: Address;
};

export default function CreateParty() {
  const { lat: latStr, lng: lngStr } =
    useLocalSearchParams<CreatePartyParams>();
  const lat = latStr ? parseFloat(latStr) : 0;
  const lng = lngStr ? parseFloat(lngStr) : 0;

  const theme = useTheme();
  const router = useRouter();
  const [step, setStep] = useState<Steps>(1);
  const [form, setForm] = useForm<CreatePartyForm>({
    title: {
      value: '',
      validate: val => ({
        isValid: val !== '',
        message: i18n.t('createParty.errTitleRequired'),
      }),
    },
    details: {
      value: '',
    },
    entryDate: {
      value: new Date(),
    },
    entryTime: {
      value: new Date(),
    },
    isPublic: {
      value: false,
    },
    music: {
      value: {
        selected: [],
        deselected: [
          'Hip-Hop',
          'Electronic',
          'Chillout',
          'Indie',
          'Metal',
          'Jazz',
          'RnB',
          'Classical',
          'Reggea',
          'Country',
        ],
      },
    },
    minAge: {
      value: undefined,
    },
    address: {
      value: {
        streetAddress: '',
        postalCode: '',
        state: '',
        country: '',
        latitude: lat,
        longitude: lat,
      },
      validate: val => {
        if (!val.streetAddress) {
          return {
            isValid: false,
            message: i18n.t('createParty.errStreetAddressRequired'),
          };
        } else if (!val.postalCode) {
          return {
            isValid: false,
            message: i18n.t('createParty.errZIPRequired'),
          };
        } else if (!val.state) {
          return {
            isValid: false,
            message: i18n.t('createParty.errStateRequired'),
          };
        } else if (!val.country) {
          return {
            isValid: false,
            message: i18n.t('createParty.errCountryRequired'),
          };
        }
      },
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: partyClient.createParty,
    onSuccess: () => {
      router.back();
    },
  });

  const initialRegion: Region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const onNavigate = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(1);
    }
  };

  const onContinue = async () => {
    form.title.trigger();
    if (step === 1 && form.title.isValid()) {
      setStep(2);
    } else if (step === 2 && form.address.isValid()) {
      const entry = new Date(
        form.entryDate.value.getFullYear(),
        form.entryDate.value.getMonth(),
        form.entryDate.value.getDate(),
        form.entryTime.value.getHours(),
        form.entryTime.value.getMinutes(),
        form.entryTime.value.getSeconds()
      );
      mutate({
        title: form.title.value,
        details: form.details.value,
        entry: Timestamp.fromDate(entry),
        musicTypes: form.music.value.selected,
        isPublic: form.isPublic.value,
        position: {
          latitude: form.address.value.latitude,
          longitude: form.address.value.longitude,
        },
        address: {
          streetAddress: form.address.value.streetAddress,
          zip: form.address.value.postalCode,
          state: form.address.value.state,
          country: form.address.value.country,
        },
        minAge: form.minAge?.value
          ? parseInt(form.minAge.value, 10)
          : undefined,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create Party</title>
      </Head>

      <ExpoStack.Screen
        options={{
          headerTitle: i18n.t(
            step === 1 ? 'createParty.titleStep1' : 'createParty.titleStep2'
          ),
          headerStyle: {
            backgroundColor: theme.backgroundPrimary.val,
          },
          headerRight: () => {
            return (
              <XStack>
                <Text variant="headline" color="$accentPrimary">
                  {step}
                </Text>
                <Text variant="headline" color="$textDisabled">
                  /2
                </Text>
              </XStack>
            );
          },
          headerLeft: () => (
            <Button variant="ghost" onPress={onNavigate}>
              <Button.Icon>
                <ChevronLeft color={theme.textLink.val} />
              </Button.Icon>
            </Button>
          ),
        }}
      />
      <ScrollView
        space="$md"
        py="$md"
        f={1}
        contentContainerStyle={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {step === 1 ? (
          <Step1 form={form} setForm={setForm} />
        ) : (
          <Step2 initialRegion={initialRegion} form={form} setForm={setForm} />
        )}
        <Button mx="$md" variant="accent" onPress={onContinue}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Button.Text>{i18n.t('createParty.action')}</Button.Text>
          )}
        </Button>
      </ScrollView>
    </>
  );
}

type Step1Props = {
  form: Form<CreatePartyForm>;
  setForm: React.Dispatch<SetFormAction<CreatePartyForm>>;
};

function Step1({ setForm, form }: Step1Props) {
  const theme = useTheme();
  const scheme = useColorScheme();
  const { Trans, t } = useI18n();

  const sharedDatePickerProps = {
    accentColor: theme['textLink'].val,
    textColor: theme['textPrimary'],
  };

  return (
    <YStack space="$lg" f={1}>
      <Input mx="$md" error={form.title.error}>
        <Input.Value
          value={form.title.value}
          onChangeText={val =>
            setForm(prev => ({
              ...prev,
              title: val,
            }))
          }
          placeholder={i18n.t('title')}
        />
        <Input.Error />
      </Input>
      <Input mx="$md" multiline>
        <Input.Value
          multiline
          value={form.details.value}
          onChangeText={val =>
            setForm(prev => ({
              ...prev,
              details: val,
            }))
          }
          placeholder={i18n.t('descriptionOpt')}
        />
      </Input>
      <Section title={t('entryDate')}>
        <XStack>
          <DateTimePicker
            testID="datePicker"
            mode="date"
            value={form.entryDate.value}
            onChange={(_, date) => {
              if (date) {
                setForm(prev => ({ ...prev, entryDate: date }));
              }
            }}
            minimumDate={new Date()}
            themeVariant={scheme ?? undefined}
            style={{
              margin: 0,
              padding: 0,
            }}
            {...sharedDatePickerProps}
          />
          <DateTimePicker
            testID="timePicker"
            value={form.entryTime.value}
            onChange={(_, date) => {
              if (date) {
                setForm(prev => ({ ...prev, entryTime: date }));
              }
            }}
            mode="time"
            {...sharedDatePickerProps}
          />
        </XStack>
      </Section>
      <Section
        title={
          <Trans
            t="music"
            components={[
              {
                component: Text,
                props: { color: '$textSecondary' },
              },
            ]}
          />
        }>
        <ChipPicker
          items={form.music.value.deselected}
          selectedChips={form.music.value.selected}
          onDeselect={deselected =>
            setForm(prev => ({
              ...prev,
              music: {
                selected: prev.music.selected.filter(
                  chip => chip !== deselected
                ),
                deselected: [...prev.music.deselected, deselected],
              },
            }))
          }
          onSelect={selected =>
            setForm(prev => ({
              ...prev,
              music: {
                deselected: prev.music.deselected.filter(
                  chip => chip !== selected
                ),
                selected: [...prev.music.selected, selected],
              },
            }))
          }
        />
      </Section>
      <Section
        title={
          <Trans
            t="createParty.minAgeOpt"
            components={[
              {
                component: Text,
                props: { color: '$textSecondary' },
              },
            ]}
          />
        }>
        <Input>
          <Input.Value
            value={form.minAge?.value}
            onChangeText={val =>
              setForm(prev => ({
                ...prev,
                minAge: val,
              }))
            }
            keyboardType="numeric"
            placeholder={i18n.t('minAge')}
          />
        </Input>
      </Section>
      <Section title={i18n.t('createParty.isPublic.title')}>
        <XStack ai="center" jc="space-between">
          <Text variant="caption">
            {i18n.t('createParty.isPublic.caption')}
          </Text>
          <Switch
            value={form.isPublic.value}
            onValueChange={val =>
              setForm(prev => ({
                ...prev,
                isPublic: val,
              }))
            }
          />
        </XStack>
      </Section>
    </YStack>
  );
}

type Step2Props = {
  form: Form<CreatePartyForm>;
  setForm: React.Dispatch<SetFormAction<CreatePartyForm>>;
  initialRegion: Region;
};

function Step2(props: Step2Props) {
  const scheme = useColorScheme();

  const { data: geocodingData } = useReverseGeocoding({
    position: {
      latitude: round(props.initialRegion.latitude, 5),
      longitude: round(props.initialRegion.longitude, 5),
    },
    type: [GeoSearchType.address],
    limit: 1,
  });

  useEffect(() => {
    if (geocodingData && geocodingData.results.length > 0) {
      // We override the position so that the initial region selected by the user gets used.
      // Instead of the one returned by the nearest address, which could be skewed.
      const addressWithoutPosition: PlainMessage<GeoSearchResult> = {
        ...geocodingData.results[0],
        position: {
          longitude: props.initialRegion.longitude,
          latitude: props.initialRegion.latitude,
        },
      };

      setSelectedAddress(addressWithoutPosition);
    }
  }, [geocodingData]);

  const setSelectedAddress = (res: PlainMessage<GeoSearchResult>) => {
    props.setForm(prev => ({
      ...prev,
      address: {
        ...prev.address,
        ...(res.address && { streetAddress: res.address }),
        ...(res.postalCode && { postalCode: res.postalCode }),
        ...(res.state && { state: res.state }),
        ...(res.country && { country: res.country }),
        ...(res.position?.latitude && { latitude: res.position.latitude }),
        ...(res.position?.longitude && { longitude: res.position.longitude }),
      },
    }));
    props.form.address.trigger();
  };

  return (
    <YStack f={1} space="$lg">
      <YStack space="$md">
        <Input mx="$md">
          <Input.Value
            onChangeText={val => {
              props.setForm(prev => ({
                ...prev,
                address: {
                  ...prev.address,
                  streetAddress: val,
                },
              }));
            }}
            value={props.form.address.value.streetAddress}
            placeholder="Street address"
          />
        </Input>
        <XStack space="$md" mx="$md">
          <Input f={1} error={props.form.address.error}>
            <Input.Value
              onChangeText={val => {
                props.setForm(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    postalCode: val,
                  },
                }));
              }}
              value={props.form.address.value.postalCode}
              placeholder="ZIP"
            />
            <Input.Error />
          </Input>
          <Input f={1}>
            <Input.Value
              onChangeText={val => {
                props.setForm(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    state: val,
                  },
                }));
              }}
              value={props.form.address.value.state}
              placeholder="State"
            />
          </Input>
          <Input f={2}>
            <Input.Value
              onChangeText={val => {
                props.setForm(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    country: val,
                  },
                }));
              }}
              value={props.form.address.value.country}
              placeholder="Country"
            />
          </Input>
        </XStack>
      </YStack>
      <Stack f={1}>
        <LocationDisplay
          style={{ flex: 1 }}
          region={{
            latitude: props.form.address.value.latitude,
            longitude: props.form.address.value.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
        <LinearGradient
          colors={[
            '$backgroundPrimary',
            scheme === 'light' ? 'rgba(255,255,255,0)' : 'transparent',
            scheme === 'light' ? 'rgba(255,255,255,0)' : 'transparent',
            '$backgroundPrimary',
          ]}
          locations={[0, 0.2, 0.8, 1]}
          style={{
            zIndex: 10,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          start={{ x: 0.5, y: 0 }}
          pointerEvents="none"
        />
      </Stack>
    </YStack>
  );
}

type SectionProps = YStackProps & {
  title: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
};
const Section = (props: SectionProps) => {
  const { title, children, action, ...rest } = props;
  return (
    <YStack mx="$md" space="$md" {...rest}>
      <XStack justifyContent="space-between">
        <Text variant="headline">{title}</Text>
        {action}
      </XStack>
      {children}
    </YStack>
  );
};

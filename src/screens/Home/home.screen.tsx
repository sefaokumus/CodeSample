import React, { useEffect, useState } from 'react'

// import { useNavigation }  from '@react-navigation/native'
import { StatusBar }      from 'expo-status-bar'
import moment             from 'moment'
import { RefreshControl } from 'react-native'
import { Calendar }       from 'react-native-calendars'

import { Ionicons } from '@expo/vector-icons'

import { Block, Spinner, Text }                     from '../../components/ui'
import { HomeScreenProps }                          from '../../constants/types'
import { useStoreActions, useStoreState, useTheme } from '../../hooks'

const HomeScreen: React.FC<HomeScreenProps> = () => {
  // const navigation                      = useNavigation<NavigationProps>()
  const { sizes, fonts, colors, lines } = useTheme()

  const { auth, user: { stats,  isLoading  } } = useStoreState(state => state)
  const { getRevisionHistory, getUserStats }   = useStoreActions(actions => actions.user)

  const [selectedDays, setSelectedDays] = useState<string[]>([])

  useEffect(() => {
    if (auth.token) {
      getData()
    }
  }, [auth.token])

  useEffect(() => {
    if (stats?.cards_per_day && stats?.cards_per_day.length > 0) {
      setSelectedDays(stats.cards_per_day.flatMap((card: object) => Object.keys(card)))
    } else { setSelectedDays([]) }
  }, [stats])

  const getData = () => {
    getRevisionHistory({ token: auth?.token })
    getUserStats({ token: auth?.token })
  }

  return (
    <Block scroll
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={getData}
        />
      }
      paddingVertical={sizes.md}
      paddingHorizontal={sizes.sm}
    >
      <StatusBar style="dark" />
      <Spinner visible={isLoading} color={colors.primary} size='large' />

      {/* header */}
      <Block flex={0} row align="center" justify="space-evenly">
        {/* current  */}
        <Text primary size={20} paddingVertical={sizes.s} style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.primary }}>
          Current
        </Text>

        {/* day view */}
        <Block flex={0} primary height={sizes.avatarSize * 1.5} width={sizes.avatarSize * 1.5} radius={sizes.avatarRadius * 1.5} padding={sizes.sm} align="center" justify="center">
          <Text center white bold size={18} style={{ flexWrap: 'wrap', width: sizes.avatarSize }}>
            {`${stats?.current_streak || 0}`}
          </Text>
          <Text center white bold size={18} style={{ flexWrap: 'wrap', width: sizes.avatarSize }}>
            {`day${stats?.current_streak === 1 ? '' : 's'}`}
          </Text>
        </Block>

        {/* streak */}
        <Text primary size={20} paddingVertical={sizes.s} style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.primary }}>
          Streak
        </Text>
      </Block>

      <Calendar
        firstDay={0}
        // Show week numbers to the left. Default = false
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        theme={{
          monthTextColor: colors.primary.toString(),
          indicatorColor: colors.primary.toString(),
          arrowColor: colors.primary.toString(),
          textDayFontFamily: fonts.normal,
          textMonthFontFamily: fonts.normal,
          textDayHeaderFontFamily: fonts.normal
        }}
        dayComponent={({ date, state }) => {
          let icon: keyof typeof Ionicons.glyphMap = 'close'

          // if day is in the future
          if (moment(date?.dateString).isAfter(moment())) { icon = 'ellipse' }

          // if day is today
          if (state === 'today') { icon = 'ios-disc' }

          // if day is in our stats
          if (selectedDays.includes(date?.dateString as string)) { icon = 'checkmark-circle-outline' }

          return <Ionicons name={icon} size={30} color={state === 'today' ? colors.secondary : colors.primary} />
        }}
      />

      {/* footer */}
      <Block row paddingVertical={sizes.sm}>
        {/* longest streaks */}
        <Block align="center" justify="space-evenly" flex={1}>
          <Ionicons size={25} color={colors.primary} name="albums-outline" />
          <Text primary size={sizes.h5} lineHeight={lines.h5}>
            Longest Streaks
          </Text>
          <Text primary size={sizes.h5} bold lineHeight={lines.h5}>
            {`${stats?.best_streak || 0} day${stats?.best_streak === 1 ? '' : 's'}`}
          </Text>
        </Block>

        <Block flex={0} style={{ borderLeftWidth: 1, borderColor: colors.primary }} marginHorizontal={sizes.sm} />

        {/* days learned */}
        <Block align="center" justify="space-evenly" flex={1}>
          <Ionicons size={25} color={colors.primary} name="md-calendar" />
          <Text primary size={sizes.h5} lineHeight={lines.h5}>
            Days Learned
          </Text>
          <Text primary size={sizes.h5} bold lineHeight={lines.h5}>
            {
              !stats
                ? '0 days'
                : `${stats?.cards_per_day?.length} day${stats?.cards_per_day?.length === 1 ? '' : 's'}`
            }
          </Text>
        </Block>
      </Block>

      {/* <Button primary  margin={sizes.s}
        onPress={() => {
          navigation.getParent('LeftDrawer').openDrawer()
        }} >
        <Text p white marginLeft={sizes.s}>
          Open Left
        </Text>
      </Button>
      <Button
        primary
        margin={sizes.s}
        onPress={() => navigation.getParent('RightDrawer').openDrawer()}
      >
        <Text p white marginLeft={sizes.s}>
          Open right drawer
        </Text>
      </Button> */}
    </Block>
  )
}

export default HomeScreen

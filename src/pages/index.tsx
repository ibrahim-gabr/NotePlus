import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

import styles from '../styles/Home.module.css'
import Content from '../components/Content'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetAllNotes } from '../features/notes/notesSlice'
import { asyncGetAllTags } from '../features/tags/tagSlice'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const IndexPage: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asyncGetAllNotes())
    dispatch(asyncGetAllTags())
  }, [])
  return (
    <>
      <Content />
    </>
  )
}

export default IndexPage

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



function classNames(...classes:string[]) {
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

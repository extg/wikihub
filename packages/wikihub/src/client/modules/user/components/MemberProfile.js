import React from 'react'
import cn from 'classnames/bind'

import {SocialMedia} from 'dafisha-components'
import {Box} from 'dafisha-components'
import styles from './MemberProfile.scss'

const cx = cn.bind(styles)

function Portlet({
  id,
  caption,
  children,
}) {
  return (
    <div className={cx('portlet', 'light', 'bordered')} id={id}>
      <div className={cx('portlet-title', 'tabbable-line')}>
        <div className={cx('caption', 'caption-md')}>
          <span className={cx('font-blue-madison', 'bold', 'uppercase')}>
            {caption}
          </span>
        </div>
      </div>
      <div className={cx('portlet-body')}>
        {children}
      </div>
    </div>
  )
}

function ProfileSidebarPortlet({
  name,
  siteUrl,
  imageUrl,
}) {
  return (
    <div className={cx('light', 'profile-sidebar-portlet', 'bordered')}>
      <div className={cx('profile-userpic')}>
        <img
          src={imageUrl}
          className={cx('img-responsive')}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: 150,
          }}
        />
      </div>
      <div className={cx('profile-usertitle')}>
        <div className={cx('profile-usertitle-name')}>
          {name}
        </div>
        <div className={cx('profile-usertitle-job')}>
          <a href={siteUrl}>{siteUrl}</a>
        </div>
      </div>
    </div>
  )
}

function MemberProfile({
  name,
  job,
  imageUrl,
  ability,
  email,
  tel,
  vkUrl,
  fbUrl,
  igUrl,
  siteUrl,
  tags,
  city,
}) {
  return (
    <div className={cx('page-content')}>
      <div className={cx('row')}>
        <div className={cx('col-md-12')}>
          <div className={cx('profile-sidebar')}>
            <ProfileSidebarPortlet
              name={name}
              siteUrl={siteUrl}
              imageUrl={imageUrl}
            />
            <SocialMedia
              vkUrl={vkUrl}
              fbUrl={fbUrl}
              igUrl={igUrl}
            />
          </div>
          <div className={cx('profile-content')}>
            <div className={cx('row')}>
              <div className={cx('col-md-12')}>
                <Portlet caption='Основное' id='main'>
                  <p>
                    <span className={cx('text-muted')}>Город проживания: </span> {city}
                  </p>
                  <p>
                    <span className={cx('text-muted')}>Должность: </span> {job}
                  </p>
                </Portlet>
                <Portlet caption='Компетенции' id='competences'>
                  <p>
                    {ability}
                  </p>
                </Portlet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MemberProfile1({
   name,
   job,
   imageUrl,
   ability,
   email,
   tel,
   vkUrl,
   fbUrl,
   igUrl,
   siteUrl,
   tags,
   city,
 }) {
  return (
    <div className={cx('MemberProfile')}>
      <div className={cx('MemberProfileSidebar')}>
        <div className={cx('imageContainer')}>
          <img src={imageUrl} alt={name}/>
        </div>
        <div className={cx('name')}>{name}</div>
        <SocialMedia
          vkUrl={vkUrl}
          fbUrl={fbUrl}
          igUrl={igUrl}
        />
      </div>
      <div className={cx('MemberProfileContent')}>
        <Box caption='Основное' id='main'>
          <div className={cx('boxTitle')}>Основное</div>
          <p>
            <span className={cx('text-muted')}>Город: </span> {city}
          </p>
          <p>
            <span className={cx('text-muted')}>Должность: </span> {job}
          </p>
        </Box>
        <Box caption='Компетенции' id='competences'>
          <div className={cx('boxTitle')}>Компетенции</div>
          <p>
            {ability}
          </p>
        </Box>
      </div>

    </div>
  )
}

export default MemberProfile1

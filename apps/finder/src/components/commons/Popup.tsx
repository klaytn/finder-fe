import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { LocalStorageKey } from '../../constants/storage'
import { useFeatures } from '../../context/configProvider'

const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupWrap = styled.div`
    position: absolute;
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    background-color: #ffffff;
    border-radius: 8px;
`
const PopupHeader = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
`

const LangToggle = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    .divider {
        width: 1px;
        height: 18px;
        background: rgba(0, 0, 0, 0.2);
    }
`

const LangButton = styled.button`
    padding: 0px;
    border: none;
    background: transparent;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    &:hover {
        cursor: pointer;
    }
    &.active {
        font-weight: 700;
        color: #511ed2;
    }
`

const PopupContent = styled.img`
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border-radius: 8px 8px 0px 0px;
    display: block;
`

const PopupFooter = styled.div`
    display: flex;
    border-radius: 0px 0px 8px 8px;
    button:first-child {
        border-right: 1px solid #e3e3e4;
    }
`
const PopupButton = styled.button`
    width: 50%;
    height: 100%;
    border: none;
    padding: 16px 2px;
    background-color: transparent;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    &:hover {
        color: #888888;
        cursor: pointer;
    }
`

const Popup = () => {
    // State: Don't show for today
    const [lang, setLang] = useState('ko')
    const [open, setOpen] = useState(false)
    const features = useFeatures()
    const popupUrl = JSON.parse(features?.popup || '{}')
    const handleOnClose = () => {
        setOpen(false)
    }

    const handleOnCloseToday = () => {
        // 13-digit timestamp
        const currentTimestamp = new Date().getTime()
        const popupValue = currentTimestamp + popupUrl?.ko + popupUrl?.en
        localStorage.setItem(LocalStorageKey.HidePopupToday, popupValue)
        setOpen(false)
    }

    useEffect(() => {
        const hiddenPopup = localStorage.getItem(LocalStorageKey.HidePopupToday) || false
        if (hiddenPopup) {
            const currentTimestamp = new Date().getTime()
            const popupValue = popupUrl?.ko + popupUrl?.en
            const hiddenPopupTimestamp = hiddenPopup.slice(0, 13)
            const hiddenPopupUrl = hiddenPopup.slice(13)
            const isToday = currentTimestamp - Number(hiddenPopupTimestamp) < 86400000
            if (hiddenPopupUrl === popupValue) {
                if (isToday) {
                    // If it's not yet been a day
                    setOpen(false)
                } else {
                    // If a day has passed -> remove from localStorage and display the popup
                    localStorage.removeItem(LocalStorageKey.HidePopupToday)
                    if (popupUrl.ko && popupUrl.en) {
                        setOpen(true)
                    }
                }
            } else {
                // If the URL stored in localStorage is different from the current URL -> remove from localStorage and display the popup
                localStorage.removeItem(LocalStorageKey.HidePopupToday)
                if (popupUrl.ko && popupUrl.en) {
                    setOpen(true)
                }
            }
        } else if (popupUrl.ko && popupUrl.en) {
            setOpen(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {open && (
                <PopupContainer>
                    <PopupWrap>
                        <PopupHeader>
                            <LangToggle>
                                <LangButton onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>
                                    English
                                </LangButton>
                                <div className="divider" />
                                <LangButton onClick={() => setLang('ko')} className={lang === 'ko' ? 'active' : ''}>
                                    한국어
                                </LangButton>
                            </LangToggle>
                        </PopupHeader>
                        <PopupContent src={lang === 'ko' ? popupUrl?.ko : popupUrl?.en} draggable="false" />
                        <PopupFooter>
                            <PopupButton onClick={handleOnCloseToday}>
                                {lang === 'ko' ? '오늘 하루 보지 않기' : 'Do not show today'}
                            </PopupButton>
                            <PopupButton onClick={handleOnClose}>{lang === 'ko' ? '닫기' : 'Close'}</PopupButton>
                        </PopupFooter>
                    </PopupWrap>
                </PopupContainer>
            )}
        </div>
    )
}

export default Popup

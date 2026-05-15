import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const galleries = [
  {
    "id": "featured",
    "title": "FEATURED",
    "description": "CURATED_HIGHLIGHTS :: BEST_OF_WORK :: SIGNATURE_FRAMES",
    "images": [
      "https://images.unsplash.com/photo-1628657485319-5865d0f2791d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDF8fHwxNzc4Nzk2MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1490013616775-3ca8865fb129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDB8fHwxNzc4Nzk2MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDF8fHwxNzc4Nzk2MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1660854672236-0aae968a67ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDB8fHwxNzc4Nzk2MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1518463732211-f1e67dfcec66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDF8fHwxNzc4Nzk2MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1645773619957-ec1d128d0aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDB8fHwxNzc4Nzk2MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1536303279892-92bcb8f29e6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDF8fHwxNzc4Nzk2MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1657102240785-95db00a47d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDB8fHwxNzc4Nzk2MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1648138961982-97e78e530534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDF8fHwxNzc4Nzk2MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1696158812032-fb389aeab998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDB8fHwxNzc4Nzk2MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1645773619851-78d9f40ca3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDF8fHwxNzc4Nzk2MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1601618831010-eadd3bc6d579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZmVhdHVyZWQlMjBwaG90b2dyYXBoeSUyMGVkaXRvcmlhbHxlbnwwfDB8fHwxNzc4Nzk2MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1735487524925-0ced2ba82859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1666198262791-1d843c28cb73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1663347918802-4a1c4dd2e1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1648178419881-8bb233a93d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659166749592-04cd02c74c2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1579667246377-4e63a50eb3b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1664765113920-71e4cb1e749e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1652934002267-4e2477e4a422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1580087433359-fbfc12a84554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1589129143694-4b475fc9258b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1647965690611-73bd1a5d433f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1589129143516-e677d7cd9cf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1645374943518-b43679f74307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1589129143742-374529fb18c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1652934002365-600acac3291d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1589129143970-12d8142e22ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1580087433326-3cc6abdceaae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwxfHx8MTc3ODc5NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1664765392980-d8226f02febe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGZlYXR1cmVkJTIwcGhvdG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MHwwfHx8MTc3ODc5NjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "id": "portraits",
    "title": "PORTRAITS",
    "description": "HEADSHOTS :: LIFESTYLE_PORTRAITS :: CHARACTER_STUDIES",
    "images": [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDF8fHwxNzc4Nzk2MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDB8fHwxNzc4Nzk2MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1606122017369-d782bbb78f32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDF8fHwxNzc4Nzk2MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1544124094-8aea0374da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDB8fHwxNzc4Nzk2MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDF8fHwxNzc4Nzk2MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1532170579297-281918c8ae72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDB8fHwxNzc4Nzk2MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1669494920898-14cbf6802f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDF8fHwxNzc4Nzk2MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1677365492809-36819c3cd0f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDB8fHwxNzc4Nzk2MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1606143412458-acc5f86de897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDF8fHwxNzc4Nzk2MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1542578985-15ccf7e6d990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDB8fHwxNzc4Nzk2MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDF8fHwxNzc4Nzk2MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1603696196733-7883d315991b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8cG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwwfDB8fHwxNzc4Nzk2MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1624711517157-25991163e537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1718964313270-d00053a7607b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1603775020644-eb8decd79994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1718964312482-738b15e4e3b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1563170446-9c3c0622d8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1507126117511-e87526de90e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1674932668403-33398b81c92f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1630087524899-868861bb9fd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1617744966315-b3c950c430c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1633382148761-d56d55cee3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1710116308235-b09c9ed4879e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1628657485319-5865d0f2791d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/flagged/photo-1576667815744-ca5c641c5ef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1568707043650-eb03f2536825?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1608694385150-ea39f2456642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1717478053976-753461612ea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwxfHx8MTc3ODc5NjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1587134639778-98f4544d26ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwwfHx8MTc3ODc5NjE2OHww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "id": "automotive",
    "title": "AUTOMOTIVE",
    "description": "CARS :: MOTORSPORT :: DETAIL_SHOTS",
    "images": [
      "https://images.unsplash.com/photo-1614160859544-177611d11f6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MXx8fDE3Nzg3OTYxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1628999740821-cbec21f7f592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MHx8fDE3Nzg3OTYxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1606942790567-5783bab8d944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MXx8fDE3Nzg3OTYxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1530675706010-bc677ce30ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MHx8fDE3Nzg3OTYxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1609007647726-d49243581398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MXx8fDE3Nzg3OTYxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1671834214047-c68b42c4bdd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MHx8fDE3Nzg3OTYxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1615158385453-bfd827c008aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MXx8fDE3Nzg3OTYxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1614152205038-df982b230f54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MHx8fDE3Nzg3OTYxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1622512641095-685bf461c92d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MXx8fDE3Nzg3OTYxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1660083081415-136289c8d318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MHx8fDE3Nzg3OTYxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1606942766393-d2cfcf34947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MXx8fDE3Nzg3OTYxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1609599008004-7da69bd3f795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8YXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5JTIwY2FyfGVufDB8MHx8fDE3Nzg3OTYxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1559145990-98b316b50cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1760413451833-fcb5643423ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1610631902892-5be58875af96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1597332356827-a60ed8e19876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1633281582178-4e1690b51620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1694895996393-c2eb8302b5fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1614152204567-04903fff36b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1575403404375-e48e09676c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1760552844989-bf9fc6a79c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1576007451315-dda4383486c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1695753741078-7084e114720d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1650172901941-0aadc4a3271c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1640589685778-eb4b5ab0f811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1728401915599-b85e1bd25da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1695753740518-f904150be02b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1661615342382-70e308dfd086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1695753740992-5cdce024b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDF8fHwxNzc4Nzk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1661615343537-a7f6ee01f2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGF1dG9tb3RpdmUlMjBwaG90b2dyYXBoeSUyMGNhcnxlbnwwfDB8fHwxNzc4Nzk2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "id": "streets",
    "title": "STREETS",
    "description": "URBAN_LIFE :: CANDID_MOMENTS :: CITY_TEXTURES",
    "images": [
      "https://images.unsplash.com/photo-1429292394373-ddbcc6bb7468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDF8fHwxNzc4Nzk2MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1501396358880-2d8f6ace3fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDB8fHwxNzc4Nzk2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1589803196988-17b417281773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDF8fHwxNzc4Nzk2MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1589850854548-8051114f1db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDB8fHwxNzc4Nzk2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1651523106806-461201a5aa98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDF8fHwxNzc4Nzk2MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1598087216773-d02ad98034f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDB8fHwxNzc4Nzk2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1693858323643-b61be7341e6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDF8fHwxNzc4Nzk2MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1675573206424-36f844f7627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDB8fHwxNzc4Nzk2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1559406340-b64d0c8a86f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDF8fHwxNzc4Nzk2MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1675282500942-151fc0a73565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDB8fHwxNzc4Nzk2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1615219748605-0c227d3d43c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDF8fHwxNzc4Nzk2MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1631203111804-0df558278514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8c3RyZWV0JTIwcGhvdG9ncmFwaHklMjB1cmJhbnxlbnwwfDB8fHwxNzc4Nzk2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1692878968489-24ee70109984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1674942002140-ec266539c4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1555555089-d785a79af4b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1674738326708-f3802e531e7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1687786281093-a063b016ac81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1638532613219-4051ace48a14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1552564273-8706ec2f9500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1674941946606-6ee086dd9fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1649024040566-d00036b8c40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1675335806879-7504791d9532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1682936189834-9e03bf5a61af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1675335808318-34d89d9d8e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1698879339196-6fccc1c72cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1718964313074-c3c4e1cbb928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1666389785855-a963e0519f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1621106438667-d1d2c2258006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1698879338883-249fdd487c4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwxfHx8MTc3ODc5NjE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1617398743726-13ddc41772b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHN0cmVldCUyMHBob3RvZ3JhcGh5JTIwdXJiYW58ZW58MHwwfHx8MTc3ODc5NjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "id": "events",
    "title": "EVENTS",
    "description": "LIVE_COVERAGE :: CELEBRATIONS :: CROWD_ENERGY",
    "images": [
      "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDF8fHwxNzc4Nzk2MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDB8fHwxNzc4Nzk2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1565035010268-a3816f98589a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDF8fHwxNzc4Nzk2MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDB8fHwxNzc4Nzk2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1619229725920-ac8b63b0631a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDF8fHwxNzc4Nzk2MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDB8fHwxNzc4Nzk2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1658227633934-b589ca17d602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDF8fHwxNzc4Nzk2MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDB8fHwxNzc4Nzk2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1619229667032-e8700319c3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDF8fHwxNzc4Nzk2MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDB8fHwxNzc4Nzk2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1583795311768-2ef98ac78740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDF8fHwxNzc4Nzk2MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZXZlbnQlMjBwaG90b2dyYXBoeSUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwwfDB8fHwxNzc4Nzk2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1543423924-b9f161af87e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1619229666372-3c26c399a4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1688412062361-583408dc928c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1497911270199-1c552ee64aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1526749464606-83091e34a261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1573055592760-a1427683e07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1619229665876-f54b2276b7bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1619229725896-1b2ca516a6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1554143907-4f0625902eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1619229667009-e7e51684e8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1630547362584-b56f402eebed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1484494789010-20fc1a011197?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1568734066241-45094773addb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1698281838407-5f3002789d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwxfHx8MTc3ODc5NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1549451371-64aa98a6f660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGV2ZW50JTIwcGhvdG9ncmFwaHklMjBjb25jZXJ0JTIwZmVzdGl2YWx8ZW58MHwwfHx8MTc3ODc5NjE3NXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "id": "film",
    "title": "FILM",
    "description": "ANALOG_GRAIN :: 35MM_LOOK :: VINTAGE_TONES",
    "images": [
      "https://images.unsplash.com/photo-1617618482053-36e9280bbf5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDF8fHwxNzc4Nzk2MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1622297118224-2a816821a174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDB8fHwxNzc4Nzk2MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1583324961572-9f4afd9ffee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDF8fHwxNzc4Nzk2MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1623475329493-889804e377f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDB8fHwxNzc4Nzk2MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1649366735070-8e78a4f86f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDF8fHwxNzc4Nzk2MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1714201624928-d77515c6ffc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDB8fHwxNzc4Nzk2MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1615196345565-2b255ccbf82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDF8fHwxNzc4Nzk2MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1714201624124-e86e1102d6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDB8fHwxNzc4Nzk2MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1602230167211-dfcbd679ed00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDF8fHwxNzc4Nzk2MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1617618776976-056b1e6973d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDB8fHwxNzc4Nzk2MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1516635572575-84ee3373085c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDF8fHwxNzc4Nzk2MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1714201623902-22d00e011947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZmlsbSUyMHBob3RvZ3JhcGh5JTIwYW5hbG9nJTIwMzVtbXxlbnwwfDB8fHwxNzc4Nzk2MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1617618481977-eea0ea3374bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1714201623945-0079e2150240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1649366381763-ebf8262581e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1493156624194-053884f699d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1646776189187-ec973aed2a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1648528643310-b0f9f6097e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1662988768135-05993e51aed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1646776215490-54af880017fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1704022273939-37adcf7dd4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1646776172398-cfa4f022bc3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1644769623789-3ba315c54670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1644321331360-aaa58e45139c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1704018767059-ebf080b0877d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659215714329-4800865c98e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1597182395173-8792129a4621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1641852412892-495d910fc272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1650174772154-43870bb557f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwxfHx8MTc3ODc5NjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1641852412770-5f525b2bce34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGZpbG0lMjBwaG90b2dyYXBoeSUyMGFuYWxvZyUyMDM1bW18ZW58MHwwfHx8MTc3ODc5NjE3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    "id": "other",
    "title": "OTHER",
    "description": "MISC_SHOTS :: MAGAZINE_STYLE :: EXPERIMENTAL_FRAMES",
    "images": [
      "https://images.unsplash.com/photo-1549298222-1c31e8915347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MXx8fDE3Nzg3OTYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MHx8fDE3Nzg3OTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1600141905113-37c4ddddcba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MXx8fDE3Nzg3OTYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1490013616775-3ca8865fb129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MHx8fDE3Nzg3OTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MXx8fDE3Nzg3OTYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1592966719124-2ca2978ba325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MHx8fDE3Nzg3OTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MXx8fDE3Nzg3OTYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1512143889056-b57b4153f038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MHx8fDE3Nzg3OTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1673334902706-477b649e89cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MXx8fDE3Nzg3OTYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1769458711046-23eab6a083b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MHx8fDE3Nzg3OTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1596382941210-9f7a03633e11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MXx8fDE3Nzg3OTYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1769458711065-b4321f4718ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8ZWRpdG9yaWFsJTIwcGhvdG9ncmFwaHklMjBtYWdhemluZSUyMHN0eWxlfGVufDB8MHx8fDE3Nzg3OTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1697914584404-42f615226a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1767510533096-0a76af1a0d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1705514284469-d32c63e1fbc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1762764919508-210e37659af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1579366877909-40560cf603e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1769103638647-7b1733843877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1772631537341-03d01be06c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1760888938850-3bc6a925ae1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758613654707-8bdab92f711d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1763750783631-10ae2fcdd44f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758613653231-bae4e1131dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1555183033-c3063def372a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758613655335-4619180f4bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1763750785023-ee0cf8d4d0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1602517623403-21c51a3f103d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1769458711036-17514a5838cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDF8fHwxNzc4Nzk2MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1553484771-8bbd4e16c60b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGVkaXRvcmlhbCUyMHBob3RvZ3JhcGh5JTIwbWFnYXppbmUlMjBzdHlsZXxlbnwwfDB8fHwxNzc4Nzk2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  }
];

export function PhotographyPortfolio() {
  const [currentGallery, setCurrentGallery] = useState(0);
  const activeGallery = galleries[currentGallery];

  const openLightbox = useCallback(
    (startIndex: number) => {
      Fancybox.show(
        activeGallery.images.map((src) => ({
          src,
          type: "image",
        })),
        {
          startIndex,
          fadeEffect: false,
          zoomEffect: false,
          dragToClose: false,
          closeButton: false,
          Carousel: {
            infinite: false,
            Arrows: true,
            Thumbs: false,
            Toolbar: {
              display: {
                left: [],
                middle: [],
                right: ["close"],
              },
            },
          },
        },
      );
    },
    [activeGallery.images],
  );

  const nextGallery = () => {
    setCurrentGallery((prev) => (prev + 1) % galleries.length);
  };

  const prevGallery = () => {
    setCurrentGallery((prev) => (prev - 1 + galleries.length) % galleries.length);
  };

  return (
    <div className="w-full">
      <div>
        <div className="sticky top-10 md:top-0 z-20 border border-[var(--dark-grey)] bg-[var(--background)]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)] lowercase">
              photo | {activeGallery.title} | {activeGallery.images.length} items
            </span>
          </div>

          <div className="bg-[var(--card)] px-2 py-2 sm:px-3 flex items-stretch gap-2 shrink-0">
            <button onClick={prevGallery} className="mechanical-button px-1.5 py-0.5 shrink-0 self-stretch">
              <ChevronLeft className="w-5 h-5 text-[var(--metallic-accent)]" />
            </button>

            <div className="flex-1 min-w-0 grid grid-cols-4 min-[850px]:grid-cols-7 gap-1.5 sm:gap-2">
              {galleries.map((gallery, index) => (
                <button
                  key={gallery.id}
                  onClick={() => setCurrentGallery(index)}
                  className={`group relative px-2 sm:px-2.5 py-1 border font-mono text-[10px] sm:text-xs transition-all ${
                    currentGallery === index
                      ? "border-[var(--metallic-silver)] bg-[var(--dark-grey)] text-[var(--metallic-silver)]"
                      : "border-[var(--dark-grey)] bg-[var(--secondary)] text-[var(--metallic-accent)] hover:border-[var(--metallic-accent)]"
                  }`}
                >
                  <span className="lowercase">{gallery.title}</span>
                  {currentGallery === index && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--metallic-silver)]" />
                  )}
                </button>
              ))}
            </div>

            <button onClick={nextGallery} className="mechanical-button px-1.5 py-0.5 shrink-0 self-stretch">
              <ChevronRight className="w-5 h-5 text-[var(--metallic-accent)]" />
            </button>
          </div>
        </div>

        <div className="relative border-x border-b border-[var(--dark-grey)] bg-[var(--background)] shadow-[4px_4px_0_0_#000]">
          <div>
            <div
              key={currentGallery}
              className="overflow-x-hidden"
            >
              <ResponsiveMasonry columnsCountBreakPoints={{ 0: 2, 900: 3, 1280: 4 }}>
                <Masonry gutter="10px" style={{ minHeight: "100%" }}>
                  {activeGallery.images.map((image, index) => (
                    <GalleryImage
                      key={index}
                      src={image}
                      index={index}
                      onOpenLightbox={openLightbox}
                    />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GalleryImageProps {
  src: string;
  index: number;
  onOpenLightbox: (startIndex: number) => void;
}

function GalleryImage({ src, index, onOpenLightbox }: GalleryImageProps) {
  const masonryBrickRatios = ["3 / 4", "4 / 3", "2 / 3", "3 / 2", "4 / 5", "16 / 10", "5 / 7", "16 / 9"] as const;
  // Use image URL hash (not index) so each masonry column gets a real mix of brick shapes.
  const hash = src.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0);
  const aspectRatio = masonryBrickRatios[hash % masonryBrickRatios.length];
  const fileName = `img_${String(index + 1).padStart(3, "0")}.jpeg`;

  return (
    <div className="group relative w-full overflow-hidden border border-[var(--dark-grey)] bg-[var(--card)] hover:border-[var(--metallic-silver)] transition-all duration-300">
      <div className="h-6 bg-[var(--primary)] border-b border-black px-2 flex items-center">
        <span className="font-mono text-[11px] text-[var(--deep-black)]">{fileName}</span>
      </div>

      <div style={{ aspectRatio }}>
        <a
          href={src}
          className="block w-full h-full cursor-zoom-in"
          onClick={(event) => {
            event.preventDefault();
            onOpenLightbox(index);
          }}
        >
          <img
            src={src}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover block opacity-85 group-hover:opacity-100"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
}

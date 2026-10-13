# Spec Delta

## ADDED Requirements

### Requirement: Latest videos presentation follows the visual references
The system SHALL present the section heading, cards, and browse action following the desktop and mobile Figma references linked in IGZ-16.

#### Scenario: Visitor views the section on desktop
- **WHEN** the visitor views the section at the desktop reference size
- **THEN** the heading and browse action share a row above four cards, with the typography, colors, spacing, rounded borders, and play overlays shown in the desktop reference

#### Scenario: Visitor views the section on mobile
- **WHEN** the visitor views the section at the mobile reference size
- **THEN** the heading appears above the browse action and the cards form one vertical column, following the mobile reference's typography, colors, spacing, rounded borders, and play overlays

### Requirement: Video cards show identifiable titles and playable content
The system SHALL show the actual video title and a visible play indicator alongside each real thumbnail. Long titles MUST remain contained without overlapping other content, and each card's accessible link name MUST retain the complete video title.

#### Scenario: A video card is displayed
- **WHEN** a real video is displayed
- **THEN** its title is visible below its real thumbnail and a play indicator identifies it as playable content

#### Scenario: A title exceeds its visible space
- **WHEN** a video's title is too long to fit the card's title area
- **THEN** its visible text wraps or truncates within the card without overflow or overlap, and its accessible link name still contains the complete title

### Requirement: Visitors can browse all channel videos
The system SHALL expose a “Ver todos los videos” action opening `https://www.youtube.com/@Ignitoz/videos` in a new tab.

#### Scenario: Visitor activates the browse action
- **WHEN** the visitor activates “Ver todos los videos”
- **THEN** the Ignitoz channel's videos page opens in a new tab

### Requirement: Latest videos remains usable across screen sizes
The system SHALL keep the heading, video titles, and navigation actions legible and usable on mobile, tablet, and desktop without horizontal overflow.

#### Scenario: Visitor changes viewport width
- **WHEN** the viewport changes between mobile, tablet, and desktop sizes
- **THEN** the section reflows within the viewport without horizontal scrolling, overlapping titles, or inaccessible actions

#### Scenario: Fewer cards are displayed
- **WHEN** only one, two, or three real videos are available
- **THEN** only those cards are displayed in newest-first order with readable titles and no filler cards

### Requirement: Latest videos navigation supports keyboard users
The system SHALL make every video card and the browse action reachable and activatable with the keyboard, with a visible focus indicator.

#### Scenario: Visitor navigates with the keyboard
- **WHEN** the visitor tabs through the section's links
- **THEN** each card and the browse action receives visible focus without the indicator being clipped

#### Scenario: Visitor activates a focused link
- **WHEN** the visitor presses Enter on a focused card or browse action
- **THEN** the corresponding YouTube destination opens in a new tab

## MODIFIED Requirements

### Requirement: Video items link to YouTube videos
The system SHALL allow visitors to open each displayed video on YouTube in a new tab without embedded playback.

#### Scenario: Visitor selects a video item
- **WHEN** a visitor activates a video item
- **THEN** the corresponding YouTube video opens in a new tab without starting embedded playback on the landing page

### Requirement: Unavailable video data does not create fake content
The system MUST NOT display fabricated videos when recent channel data cannot be loaded. The existing empty and error messages SHALL remain understandable, and the section heading and “Ver todos los videos” action SHALL remain available in both states.

#### Scenario: Recent video data cannot be loaded
- **WHEN** recent Ignitoz channel video data is unavailable
- **THEN** the section remains understandable without showing fake video thumbnails or fake video links, and the heading and browse action remain available

#### Scenario: No public videos are available
- **WHEN** the channel returns no public videos
- **THEN** the existing empty message is displayed without fabricated cards, and the heading and browse action remain available

#### Scenario: Loading videos fails
- **WHEN** a request for recent videos fails
- **THEN** the existing error message is displayed without fabricated cards, and the heading and browse action remain available

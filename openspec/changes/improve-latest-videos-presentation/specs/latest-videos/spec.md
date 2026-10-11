# Spec Delta

## MODIFIED Requirements

### Requirement: Video items link to YouTube videos
The system SHALL allow visitors to open each displayed video on YouTube in a new browser tab, without embedded playback.

#### Scenario: Visitor selects a video item
- **WHEN** a visitor activates a video item
- **THEN** the corresponding YouTube video opens in a new browser tab
- **AND** the landing page remains available in its original tab

## ADDED Requirements

### Requirement: Section presentation follows the referenced design
The system SHALL present the latest videos section according to the desktop and mobile Figma designs referenced by IGZ-16, with Figma defining visual details.

#### Scenario: Visitor views the section
- **WHEN** a visitor views the latest videos section on desktop or mobile
- **THEN** its heading, video cards, and channel browsing action follow the corresponding referenced design
- **AND** unrelated landing page sections are not required to adopt that design

### Requirement: Video items identify their content
The system SHALL show each video's real title visibly alongside its real thumbnail and provide a visual cue identifying video content. Long titles MUST remain contained without overlapping other content, and the link's accessible name MUST retain the full title.

#### Scenario: Video data is available
- **WHEN** a real video is displayed
- **THEN** the card shows that video's title and thumbnail
- **AND** a visual cue identifies it as video content

#### Scenario: Video title is long
- **WHEN** a displayed video has a title longer than the available card space
- **THEN** the title does not overflow or overlap other elements
- **AND** the link's accessible name includes the complete title

### Requirement: Section adapts to available viewport space
The system SHALL adapt the section to mobile, tablet, and desktop viewports without horizontal overflow, while keeping titles readable and actions accessible.

#### Scenario: Viewport size changes
- **WHEN** a visitor views or resizes the page across mobile, tablet, and desktop widths
- **THEN** the section fits the available width without horizontal overflow
- **AND** video titles remain readable and video and channel actions remain accessible

### Requirement: Visitors can browse all channel videos
The system SHALL provide a “Ver todos los videos” action that opens https://www.youtube.com/@Ignitoz/videos in a new browser tab. The section heading and this action SHALL remain available when video data is empty or cannot be loaded.

#### Scenario: Visitor activates the channel action
- **WHEN** a visitor activates “Ver todos los videos”
- **THEN** the Ignitoz channel videos page opens in a new browser tab
- **AND** the landing page remains available in its original tab

#### Scenario: No public videos are returned
- **WHEN** video data loads successfully with no public videos
- **THEN** the existing empty state is displayed without fabricated videos
- **AND** the section heading and “Ver todos los videos” action remain available

#### Scenario: Video data cannot be loaded
- **WHEN** the latest video request fails
- **THEN** the existing error state is displayed without fabricated videos
- **AND** the section heading and “Ver todos los videos” action remain available

### Requirement: Section actions support keyboard navigation
The system SHALL allow keyboard activation of video cards and the channel browsing action and SHALL show a visible focus indicator on each focused action.

#### Scenario: Visitor navigates with a keyboard
- **WHEN** a visitor moves keyboard focus through the section
- **THEN** each video link and the channel browsing action can receive focus with a visible indicator
- **AND** pressing Enter activates the focused link with its specified destination and new-tab behavior

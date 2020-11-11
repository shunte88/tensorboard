/* Copyright 2020 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

import {DataSeriesMetadataMap, Dimension, Extent} from '../internal_types';
import {RendererType} from '../renderer/renderer_types';
import {ScaleType} from '../scale_types';
import {CompactDataSeries} from './compact_data_series';

export {RendererType} from '../renderer/renderer_types';

export enum HostToGuestEvent {
  SERIES_DATA_UPDATE,
  SERIES_METADATA_CHANGED,
  SCALE_UPDATE,
  VIEW_BOX_UPDATE,
  INIT,
  DOM_RESIZED,
}

export interface InitMessage {
  type: HostToGuestEvent.INIT;
  canvas: OffscreenCanvas;
  devicePixelRatio: number;
  dim: Dimension;
  // Cannot support SVG in the offscreen.
  rendererType: RendererType.WEBGL;
}

export interface UpdateViewBoxMessage {
  type: HostToGuestEvent.VIEW_BOX_UPDATE;
  extent: Extent;
}

export interface ResizeMessage {
  type: HostToGuestEvent.DOM_RESIZED;
  dim: Dimension;
}

export interface SeriesUpdateMessage {
  type: HostToGuestEvent.SERIES_DATA_UPDATE;
  compactDataSeries: CompactDataSeries;
}

export type SeriesMetadataMap = DataSeriesMetadataMap;

export interface SeriesMetadataChangedMessage {
  type: HostToGuestEvent.SERIES_METADATA_CHANGED;
  metadata: SeriesMetadataMap;
}

export interface ScaleUpdateMessage {
  type: HostToGuestEvent.SCALE_UPDATE;
  axis: 'x' | 'y';
  scaleType: ScaleType;
}

export type MainToGuestMessage =
  | UpdateViewBoxMessage
  | ResizeMessage
  | ScaleUpdateMessage
  | SeriesUpdateMessage
  | SeriesMetadataChangedMessage;

export enum GuestToMainType {
  ON_REDRAW_END,
}

export interface RedrawEndMessage {
  type: GuestToMainType.ON_REDRAW_END;
}

export type GuestToMainMessage = RedrawEndMessage;

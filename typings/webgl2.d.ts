/*
  Copyright 2017 Google Inc. All Rights Reserved.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
// Type definitions for WebGL2
// Project: https://www.khronos.org/registry/webgl/specs/latest/2.0/

interface HTMLCanvasElement {
    getContext(contextId: "2d", contextAttributes?: Canvas2DContextAttributes): CanvasRenderingContext2D | null;
    getContext(contextId: "webgl" | "experimental-webgl", contextAttributes?: WebGLContextAttributes): WebGLRenderingContext | null;
    getContext(contextId: "webgl2" | "experimental-webgl2", contextAttributes?: WebGLContextAttributes): WebGL2RenderingContext | null;
    getContext(contextId: string, contextAttributes?: {}): CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext | null;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
}

type GLint64 = number;
type GLuint64 = number;
type BufferDataSource = ArrayBuffer | ArrayBufferView;
type TexImageSource = ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

interface WebGLQuery extends WebGLObject {
}

interface WebGLSampler extends WebGLObject {
}

interface WebGLSync extends WebGLObject {
}

interface WebGLTransformFeedback extends WebGLObject {
}

interface WebGLVertexArrayObject extends WebGLObject {
}

interface WebGL2RenderingContext extends WebGLRenderingContext {
  READ_BUFFER: GLenum;
  UNPACK_ROW_LENGTH: GLenum;
  UNPACK_SKIP_ROWS: GLenum;
  UNPACK_SKIP_PIXELS: GLenum;
  PACK_ROW_LENGTH: GLenum;
  PACK_SKIP_ROWS: GLenum;
  PACK_SKIP_PIXELS: GLenum;
  COLOR: GLenum;
  DEPTH: GLenum;
  STENCIL: GLenum;
  RED: GLenum;
  RGB8: GLenum;
  RGBA8: GLenum;
  RGB10_A2: GLenum;
  TEXTURE_BINDING_3D: GLenum;
  UNPACK_SKIP_IMAGES: GLenum;
  UNPACK_IMAGE_HEIGHT: GLenum;
  TEXTURE_3D: GLenum;
  TEXTURE_WRAP_R: GLenum;
  MAX_3D_TEXTURE_SIZE: GLenum;
  UNSIGNED_INT_2_10_10_10_REV: GLenum;
  MAX_ELEMENTS_VERTICES: GLenum;
  MAX_ELEMENTS_INDICES: GLenum;
  TEXTURE_MIN_LOD: GLenum;
  TEXTURE_MAX_LOD: GLenum;
  TEXTURE_BASE_LEVEL: GLenum;
  TEXTURE_MAX_LEVEL: GLenum;
  MIN: GLenum;
  MAX: GLenum;
  DEPTH_COMPONENT24: GLenum;
  MAX_TEXTURE_LOD_BIAS: GLenum;
  TEXTURE_COMPARE_MODE: GLenum;
  TEXTURE_COMPARE_FUNC: GLenum;
  CURRENT_QUERY: GLenum;
  QUERY_RESULT: GLenum;
  QUERY_RESULT_AVAILABLE: GLenum;
  STREAM_READ: GLenum;
  STREAM_COPY: GLenum;
  STATIC_READ: GLenum;
  STATIC_COPY: GLenum;
  DYNAMIC_READ: GLenum;
  DYNAMIC_COPY: GLenum;
  MAX_DRAW_BUFFERS: GLenum;
  DRAW_BUFFER0: GLenum;
  DRAW_BUFFER1: GLenum;
  DRAW_BUFFER2: GLenum;
  DRAW_BUFFER3: GLenum;
  DRAW_BUFFER4: GLenum;
  DRAW_BUFFER5: GLenum;
  DRAW_BUFFER6: GLenum;
  DRAW_BUFFER7: GLenum;
  DRAW_BUFFER8: GLenum;
  DRAW_BUFFER9: GLenum;
  DRAW_BUFFER10: GLenum;
  DRAW_BUFFER11: GLenum;
  DRAW_BUFFER12: GLenum;
  DRAW_BUFFER13: GLenum;
  DRAW_BUFFER14: GLenum;
  DRAW_BUFFER15: GLenum;
  MAX_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
  MAX_VERTEX_UNIFORM_COMPONENTS: GLenum;
  SAMPLER_3D: GLenum;
  SAMPLER_2D_SHADOW: GLenum;
  FRAGMENT_SHADER_DERIVATIVE_HINT: GLenum;
  PIXEL_PACK_BUFFER: GLenum;
  PIXEL_UNPACK_BUFFER: GLenum;
  PIXEL_PACK_BUFFER_BINDING: GLenum;
  PIXEL_UNPACK_BUFFER_BINDING: GLenum;
  FLOAT_MAT2x3: GLenum;
  FLOAT_MAT2x4: GLenum;
  FLOAT_MAT3x2: GLenum;
  FLOAT_MAT3x4: GLenum;
  FLOAT_MAT4x2: GLenum;
  FLOAT_MAT4x3: GLenum;
  SRGB: GLenum;
  SRGB8: GLenum;
  SRGB8_ALPHA8: GLenum;
  COMPARE_REF_TO_TEXTURE: GLenum;
  RGBA32F: GLenum;
  RGB32F: GLenum;
  RGBA16F: GLenum;
  RGB16F: GLenum;
  VERTEX_ATTRIB_ARRAY_INTEGER: GLenum;
  MAX_ARRAY_TEXTURE_LAYERS: GLenum;
  MIN_PROGRAM_TEXEL_OFFSET: GLenum;
  MAX_PROGRAM_TEXEL_OFFSET: GLenum;
  MAX_VARYING_COMPONENTS: GLenum;
  TEXTURE_2D_ARRAY: GLenum;
  TEXTURE_BINDING_2D_ARRAY: GLenum;
  R11F_G11F_B10F: GLenum;
  UNSIGNED_INT_10F_11F_11F_REV: GLenum;
  RGB9_E5: GLenum;
  UNSIGNED_INT_5_9_9_9_REV: GLenum;
  TRANSFORM_FEEDBACK_BUFFER_MODE: GLenum;
  MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: GLenum;
  TRANSFORM_FEEDBACK_VARYINGS: GLenum;
  TRANSFORM_FEEDBACK_BUFFER_START: GLenum;
  TRANSFORM_FEEDBACK_BUFFER_SIZE: GLenum;
  TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: GLenum;
  RASTERIZER_DISCARD: GLenum;
  MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: GLenum;
  MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: GLenum;
  INTERLEAVED_ATTRIBS: GLenum;
  SEPARATE_ATTRIBS: GLenum;
  TRANSFORM_FEEDBACK_BUFFER: GLenum;
  TRANSFORM_FEEDBACK_BUFFER_BINDING: GLenum;
  RGBA32UI: GLenum;
  RGB32UI: GLenum;
  RGBA16UI: GLenum;
  RGB16UI: GLenum;
  RGBA8UI: GLenum;
  RGB8UI: GLenum;
  RGBA32I: GLenum;
  RGB32I: GLenum;
  RGBA16I: GLenum;
  RGB16I: GLenum;
  RGBA8I: GLenum;
  RGB8I: GLenum;
  RED_INTEGER: GLenum;
  RGB_INTEGER: GLenum;
  RGBA_INTEGER: GLenum;
  SAMPLER_2D_ARRAY: GLenum;
  SAMPLER_2D_ARRAY_SHADOW: GLenum;
  SAMPLER_CUBE_SHADOW: GLenum;
  UNSIGNED_INT_VEC2: GLenum;
  UNSIGNED_INT_VEC3: GLenum;
  UNSIGNED_INT_VEC4: GLenum;
  INT_SAMPLER_2D: GLenum;
  INT_SAMPLER_3D: GLenum;
  INT_SAMPLER_CUBE: GLenum;
  INT_SAMPLER_2D_ARRAY: GLenum;
  UNSIGNED_INT_SAMPLER_2D: GLenum;
  UNSIGNED_INT_SAMPLER_3D: GLenum;
  UNSIGNED_INT_SAMPLER_CUBE: GLenum;
  UNSIGNED_INT_SAMPLER_2D_ARRAY: GLenum;
  DEPTH_COMPONENT32F: GLenum;
  DEPTH32F_STENCIL8: GLenum;
  FLOAT_32_UNSIGNED_INT_24_8_REV: GLenum;
  FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: GLenum;
  FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: GLenum;
  FRAMEBUFFER_ATTACHMENT_RED_SIZE: GLenum;
  FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: GLenum;
  FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: GLenum;
  FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: GLenum;
  FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: GLenum;
  FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: GLenum;
  FRAMEBUFFER_DEFAULT: GLenum;
  DEPTH_STENCIL_ATTACHMENT: GLenum;
  DEPTH_STENCIL: GLenum;
  UNSIGNED_INT_24_8: GLenum;
  DEPTH24_STENCIL8: GLenum;
  UNSIGNED_NORMALIZED: GLenum;
  DRAW_FRAMEBUFFER_BINDING: GLenum;
  READ_FRAMEBUFFER: GLenum;
  DRAW_FRAMEBUFFER: GLenum;
  READ_FRAMEBUFFER_BINDING: GLenum;
  RENDERBUFFER_SAMPLES: GLenum;
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: GLenum;
  MAX_COLOR_ATTACHMENTS: GLenum;
  COLOR_ATTACHMENT1: GLenum;
  COLOR_ATTACHMENT2: GLenum;
  COLOR_ATTACHMENT3: GLenum;
  COLOR_ATTACHMENT4: GLenum;
  COLOR_ATTACHMENT5: GLenum;
  COLOR_ATTACHMENT6: GLenum;
  COLOR_ATTACHMENT7: GLenum;
  COLOR_ATTACHMENT8: GLenum;
  COLOR_ATTACHMENT9: GLenum;
  COLOR_ATTACHMENT10: GLenum;
  COLOR_ATTACHMENT11: GLenum;
  COLOR_ATTACHMENT12: GLenum;
  COLOR_ATTACHMENT13: GLenum;
  COLOR_ATTACHMENT14: GLenum;
  COLOR_ATTACHMENT15: GLenum;
  FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: GLenum;
  MAX_SAMPLES: GLenum;
  HALF_FLOAT: GLenum;
  RG: GLenum;
  RG_INTEGER: GLenum;
  R8: GLenum;
  RG8: GLenum;
  R16F: GLenum;
  R32F: GLenum;
  RG16F: GLenum;
  RG32F: GLenum;
  R8I: GLenum;
  R8UI: GLenum;
  R16I: GLenum;
  R16UI: GLenum;
  R32I: GLenum;
  R32UI: GLenum;
  RG8I: GLenum;
  RG8UI: GLenum;
  RG16I: GLenum;
  RG16UI: GLenum;
  RG32I: GLenum;
  RG32UI: GLenum;
  VERTEX_ARRAY_BINDING: GLenum;
  R8_SNORM: GLenum;
  RG8_SNORM: GLenum;
  RGB8_SNORM: GLenum;
  RGBA8_SNORM: GLenum;
  SIGNED_NORMALIZED: GLenum;
  COPY_READ_BUFFER: GLenum;
  COPY_WRITE_BUFFER: GLenum;
  COPY_READ_BUFFER_BINDING: GLenum;
  COPY_WRITE_BUFFER_BINDING: GLenum;
  UNIFORM_BUFFER: GLenum;
  UNIFORM_BUFFER_BINDING: GLenum;
  UNIFORM_BUFFER_START: GLenum;
  UNIFORM_BUFFER_SIZE: GLenum;
  MAX_VERTEX_UNIFORM_BLOCKS: GLenum;
  MAX_FRAGMENT_UNIFORM_BLOCKS: GLenum;
  MAX_COMBINED_UNIFORM_BLOCKS: GLenum;
  MAX_UNIFORM_BUFFER_BINDINGS: GLenum;
  MAX_UNIFORM_BLOCK_SIZE: GLenum;
  MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: GLenum;
  MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
  UNIFORM_BUFFER_OFFSET_ALIGNMENT: GLenum;
  ACTIVE_UNIFORM_BLOCKS: GLenum;
  UNIFORM_TYPE: GLenum;
  UNIFORM_SIZE: GLenum;
  UNIFORM_BLOCK_INDEX: GLenum;
  UNIFORM_OFFSET: GLenum;
  UNIFORM_ARRAY_STRIDE: GLenum;
  UNIFORM_MATRIX_STRIDE: GLenum;
  UNIFORM_IS_ROW_MAJOR: GLenum;
  UNIFORM_BLOCK_BINDING: GLenum;
  UNIFORM_BLOCK_DATA_SIZE: GLenum;
  UNIFORM_BLOCK_ACTIVE_UNIFORMS: GLenum;
  UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: GLenum;
  UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: GLenum;
  UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: GLenum;
  INVALID_INDEX: GLenum;
  MAX_VERTEX_OUTPUT_COMPONENTS: GLenum;
  MAX_FRAGMENT_INPUT_COMPONENTS: GLenum;
  MAX_SERVER_WAIT_TIMEOUT: GLenum;
  OBJECT_TYPE: GLenum;
  SYNC_CONDITION: GLenum;
  SYNC_STATUS: GLenum;
  SYNC_FLAGS: GLenum;
  SYNC_FENCE: GLenum;
  SYNC_GPU_COMMANDS_COMPLETE: GLenum;
  UNSIGNALED: GLenum;
  SIGNALED: GLenum;
  ALREADY_SIGNALED: GLenum;
  TIMEOUT_EXPIRED: GLenum;
  CONDITION_SATISFIED: GLenum;
  WAIT_FAILED: GLenum;
  SYNC_FLUSH_COMMANDS_BIT: GLenum;
  VERTEX_ATTRIB_ARRAY_DIVISOR: GLenum;
  ANY_SAMPLES_PASSED: GLenum;
  ANY_SAMPLES_PASSED_CONSERVATIVE: GLenum;
  SAMPLER_BINDING: GLenum;
  RGB10_A2UI: GLenum;
  INT_2_10_10_10_REV: GLenum;
  TRANSFORM_FEEDBACK: GLenum;
  TRANSFORM_FEEDBACK_PAUSED: GLenum;
  TRANSFORM_FEEDBACK_ACTIVE: GLenum;
  TRANSFORM_FEEDBACK_BINDING: GLenum;
  TEXTURE_IMMUTABLE_FORMAT: GLenum;
  MAX_ELEMENT_INDEX: GLenum;
  TEXTURE_IMMUTABLE_LEVELS: GLenum;

  TIMEOUT_IGNORED: GLint64;

  MAX_CLIENT_WAIT_TIMEOUT_WEBGL: GLenum;

  bufferData(target: GLenum, size: GLsizeiptr, usage: GLenum): void;
  bufferData(target: GLenum, srcData: ArrayBuffer | null, usage: GLenum): void;
  bufferData(target: GLenum, srcData: ArrayBufferView, usage: GLenum): void;
  bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: BufferDataSource): void;
  bufferData(target: GLenum, srcData: ArrayBufferView, usage: GLenum, srcOffset: GLuint, length?: GLuint): void;
  bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: ArrayBufferView, srcOffset: GLuint, length?: GLuint): void;
  copyBufferSubData(readTarget: GLenum, writeTarget: GLenum, readOffset: GLintptr, writeOffset: GLintptr, size: GLsizeiptr): void;
  getBufferSubData(target: GLenum, srcByteOffset: GLintptr, dstBuffer: ArrayBufferView, dstOffset?: GLuint, length?: GLuint): void;
  blitFramebuffer(srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint, dstX0: GLint, dstY0: GLint, dstX1: GLint, dstY1: GLint, mask: GLbitfield, filter: GLenum): void;
  framebufferTextureLayer(target: GLenum, attachment: GLenum, texture: WebGLTexture | null, level: GLint, layer: GLint): void;
  invalidateFramebuffer(target: GLenum, attachments: GLenum[]): void;
  invalidateSubFramebuffer(target: GLenum, attachments: GLenum[], x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
  readBuffer(src: GLenum): void;
  getInternalformatParameter(target: GLenum, internalformat: GLenum, pname: GLenum): any;
  renderbufferStorageMultisample(target: GLenum, samples: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
  texStorage2D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
  texStorage3D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei): void;
  // texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
  // texImage2D(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
  // texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
  // texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
  // texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
  // texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
  // texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
  texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
  texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
  texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView | null): void;
  texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
  // texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
  // texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void;
  // texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
  texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
  texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void;
  texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView | null, srcOffset?: GLuint): void;
  copyTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
  compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;
  compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
  compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;
  compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
  compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void;
  compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
  compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void;
  compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
  getFragDataLocation(program: WebGLProgram, name: string): GLint;
  uniform1ui(location: WebGLUniformLocation | null, v0: GLuint): void;
  uniform2ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint): void;
  uniform3ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint): void;
  uniform4ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void;
  uniform1fv(location: WebGLUniformLocation | null, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform2fv(location: WebGLUniformLocation | null, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform3fv(location: WebGLUniformLocation | null, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform4fv(location: WebGLUniformLocation | null, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform1iv(location: WebGLUniformLocation | null, data: Int32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform2iv(location: WebGLUniformLocation | null, data: Int32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform3iv(location: WebGLUniformLocation | null, data: Int32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform4iv(location: WebGLUniformLocation | null, data: Int32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform1uiv(location: WebGLUniformLocation | null, data: Uint32Array | GLuint[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform2uiv(location: WebGLUniformLocation | null, data: Uint32Array | GLuint[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform3uiv(location: WebGLUniformLocation | null, data: Uint32Array | GLuint[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform4uiv(location: WebGLUniformLocation | null, data: Uint32Array | GLuint[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix3x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix4x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix2x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix4x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix2x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix3x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32Array | number[], srcOffset?: GLuint, srcLength?: GLuint): void;
  vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void;
  vertexAttribI4iv(index: GLuint, values: Int32Array | number[]): void;
  vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void;
  vertexAttribI4uiv(index: GLuint, values: Uint32Array | GLuint[]): void;
  vertexAttribIPointer(index: GLuint, size: GLint, type: GLenum, stride: GLsizei, offset: GLintptr): void;
  vertexAttribDivisor(index: GLuint, divisor: GLuint): void;
  drawArraysInstanced(mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void;
  drawElementsInstanced(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, instanceCount: GLsizei): void;
  drawRangeElements(mode: GLenum, start: GLuint, end: GLuint, count: GLsizei, type: GLenum, offset: GLintptr): void;
  readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView | null): void;
  readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, offset: GLintptr): void;
  readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView, dstOffset: GLuint): void;
  drawBuffers(buffers: GLenum[]): void;
  clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Float32Array | number[], srcOffset?: GLuint): void;
  clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Int32Array | number[], srcOffset?: GLuint): void;
  clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Uint32Array | GLuint[], srcOffset?: GLuint): void;
  clearBufferfi(buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void;
  createQuery(): WebGLQuery | null;
  deleteQuery(query: WebGLQuery | null): void;
  isQuery(query: WebGLQuery | null): GLboolean;
  beginQuery(target: GLenum, query: WebGLQuery): void;
  endQuery(target: GLenum): void;
  getQuery(target: GLenum, pname: GLenum): WebGLQuery | null;
  getQueryParameter(query: WebGLQuery, pname: GLenum): any;
  createSampler(): WebGLSampler | null;
  deleteSampler(sampler: WebGLSampler | null): void;
  isSampler(sampler: WebGLSampler | null): GLboolean;
  bindSampler(unit: GLuint, sampler: WebGLSampler | null): void;
  samplerParameteri(sampler: WebGLSampler, pname: GLenum, param: GLint): void;
  samplerParameterf(sampler: WebGLSampler, pname: GLenum, param: GLfloat): void;
  getSamplerParameter(sampler: WebGLSampler, pname: GLenum): any;
  fenceSync(condition: GLenum, flags: GLbitfield): WebGLSync | null;
  isSync(sync: WebGLSync | null): GLboolean;
  deleteSync(sync: WebGLSync | null): void;
  clientWaitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum;
  waitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void;
  getSyncParameter(sync: WebGLSync, pname: GLenum): any;
  createTransformFeedback(): WebGLTransformFeedback | null;
  deleteTransformFeedback(tf: WebGLTransformFeedback | null): void;
  isTransformFeedback(tf: WebGLTransformFeedback | null): GLboolean;
  bindTransformFeedback (target: GLenum, tf: WebGLTransformFeedback | null): void;
  beginTransformFeedback(primitiveMode: GLenum): void;
  endTransformFeedback(): void;
  transformFeedbackVaryings(program: WebGLProgram, varyings: string[], bufferMode: GLenum): void;
  getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
  pauseTransformFeedback(): void;
  resumeTransformFeedback(): void;
  bindBufferBase(target: GLenum, index: GLuint, buffer: WebGLBuffer | null): void;
  bindBufferRange(target: GLenum, index: GLuint, buffer: WebGLBuffer | null, offset: GLintptr, size: GLsizeiptr): void;
  getIndexedParameter(target: GLenum, index: GLuint): any;
  getUniformIndices(program: WebGLProgram, uniformNames: string[]): GLuint[] | null;
  getActiveUniforms(program: WebGLProgram, uniformIndices: GLuint[], pname: GLenum): any;
  getUniformBlockIndex(program: WebGLProgram, uniformBlockName: string): GLuint;
  getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): any;
  getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): string | null;
  uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void;
  createVertexArray(): WebGLVertexArrayObject | null;
  deleteVertexArray(vertexArray: WebGLVertexArrayObject | null): void;
  isVertexArray(vertexArray: WebGLVertexArrayObject | null): GLboolean;
  bindVertexArray(array: WebGLVertexArrayObject | null): void;
}

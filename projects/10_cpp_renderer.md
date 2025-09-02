---
layout: project
type: project
image: 'https://hmxs-1315810738.cos.ap-shanghai.myqcloud.com/img/202406202341390.png'
title: "C++ Software Renderer from Scratch"
date: 2024-09-12
published: true
labels:
  - C/C++
  - Graphics
summary: "Final project for the 'Computer Graphics' course.<br>A software rasterizer built from the ground up with no third-party dependencies."
---

# Developing a C++ Software Renderer from Scratch

> **GitHub Repository**: [https://github.com/hmxsqaq/Graphics-TinyRenderer](https://github.com/hmxsqaq/Graphics-TinyRenderer)
>
> The GitHub repository contains a more detailed English project document and the latest source code.
>
> **This project marks the beginning of my journey into computer graphics. It has many imperfections and areas I'm not satisfied with. I am currently refactoring the project based on the `Win32API`. If you're interested, you can check it out [here](https://github.com/hmxsqaq/HmxsRenderer).**

## Overview

This is a tiny C++ software rasterizer based on [tinyrenderer](https://github.com/ssloy/tinyrenderer/wiki). It can read `.obj` model files and `.tga` texture images, render the model, and output the result to a `.tga` file.

My goal is to create a flexible renderer without relying on any third-party libraries. In this practice, I will personally write all the code, from the most basic geometry math library to the rasterizer itself. Through this process, I can comprehensively understand and control everything in the renderer, enhancing my understanding of computer graphics, C++, and software architecture design. This will be of great benefit to my future studies.

Here are some examples of the output images:

*Since Markdown does not natively display TGA images, the images here have been converted to PNG format for display purposes.*

<div class="text-center p-4">
  <img width="200px" src="https://hmxs-1315810738.cos.ap-shanghai.myqcloud.com/img/202406202341390.png" class="img-thumbnail" >
  <img width="200px" src="https://hmxs-1315810738.cos.ap-shanghai.myqcloud.com/img/202406202345553.png" class="img-thumbnail" >
  <img width="200px" src="https://hmxs-1315810738.cos.ap-shanghai.myqcloud.com/img/202406202345558.png" class="img-thumbnail" >
  <img width="200px" src="https://hmxs-1315810738.cos.ap-shanghai.myqcloud.com/img/202406202351974.png" class="img-thumbnail" >
  <img width="200px" src="https://hmxs-1315810738.cos.ap-shanghai.myqcloud.com/img/202406202351979.png" class="img-thumbnail" >
</div>

## Features

- [x] No third-party library dependencies
- [x] Small and flexible architecture
- [x] Custom geometry library (vector and matrix operations)
- [x] `.obj` model loading
- [x] `.tga` image reading and writing (with RLE compression)
- [x] Line drawing
- [x] Barycentric coordinate calculation
- [x] Triangle rasterization
- [x] Depth buffering
- [x] Normal mapping
- [x] Texture mapping
- [x] Phong shading
- [x] Customizable shaders
- [ ] Shadow mapping
- [ ] Anti-aliasing

## Architecture

<img class="my-markdowm-img" src="https://hmxs-1315810738.cos.ap-shanghai.myqcloud.com/img/202406202351924.png" alt="class_diagram">

- **`main.cpp`**

This is the main rendering pipeline of the program.

1.  Define basic information such as image size, model paths, camera, etc.
2.  Load models and textures.
3.  Initialize the renderer and shader.
4.  Set up the MVP and viewport matrices.
5.  Render!!!
6.  Save the final image.

You can define your own custom shaders within the `main.cpp` file.

```cpp
int main(int argc, char** argv) {
    std::vector<std::string> object_infos = {
            // R"(..\model\african_head\african_head.obj)",
            // R"(..\model\african_head\african_head_eye_inner.obj)",
            // R"(..\model\diablo3_pose\diablo3_pose.obj)",
            // R"(..\model\boggie\body.obj)",
            // R"(..\model\boggie\eyes.obj)",
            // R"(..\model\boggie\head.obj)",
            R"(..\model\cottage.obj)",
    };
    const std::string output_filename = "../image/output.tga";

    Renderer renderer(width, height, Color::RGB);

    for (const auto& model_path : object_infos) {
        Object object(model_path, {0.0, 0.0, 0.0}, 0, 1);
        set_model_mat(object.angle, object.scale, object.position);
        set_view_mat(camera.position);
        set_projection_mat(camera.fov, camera.aspect_ratio, camera.zNear, camera.zFar);
        GouraudShader shader(object.model, {light1, light2});
        renderer.draw_object(object, shader);
    }

    TGAHandler::write_tga_file(output_filename,
                               renderer.width(),
                               renderer.height(),
                               renderer.bpp(),
                               renderer.frame_data());
    return 0;
}
```

- **`geometry.h` & `color.h`**

These files contain the basic geometry and color classes that define the program's fundamental data structures.

`geometry.h` uses `template` to define `Vec<T>` and `Mat<rows, cols>` classes for vector and matrix representation. It implements basic vector and matrix operations like `+`, `-`, `*`, `/`, as well as useful functions such as `cross()`, `normalize()`, `invert()`, and `transpose()`.

`color.h` defines the `Color` class to represent image colors, using four `uint8_t` values to store the data.

```cpp
struct Color {
    enum ColorFormat { GRAYSCALE = 1, RGB = 3, RGBA = 4 };

    std::array<std::uint8_t, 4> bgra = {0, 0, 0, 0}; // BLUE, GREEN, RED, alpha

    constexpr std::uint8_t& operator[](const int i) noexcept { assert(i >= 0 && i < 4); return bgra[i]; }
    constexpr std::uint8_t operator[](const int i) const noexcept { assert(i >= 0 && i < 4); return bgra[i]; }
    constexpr std::uint8_t R() const noexcept { return bgra[2]; }
    constexpr std::uint8_t G() const noexcept { return bgra[1]; }
    constexpr std::uint8_t B() const noexcept { return bgra[0]; }
    constexpr std::uint8_t A() const noexcept { return bgra[3]; }
    constexpr Vec3 to_vec3() const noexcept { return { R() / 255.0, G() / 255.0, B() / 255.0 }; }
};

inline std::ostream& operator<<(std::ostream &out, const Color &color) {
    out <<
    "R " << static_cast<int>(color.R()) <<
    " G " << static_cast<int>(color.G()) <<
    " B " << static_cast<int>(color.B()) <<
    " A " << static_cast<int>(color.A());
    return out;
}

inline Color operator*(const Color &color, const double scalar) {
    Color result;
    for (int i = 0; i < 3; ++i)
        result[i] = static_cast<std::uint8_t>(color[i] * scalar);
    return result;
}
```

- **`texture.h` & `model.h`**

These files are responsible for loading textures and models.

`texture.h` defines the `Texture` class, which stores the color data of a texture image. It provides a `get_color(uv)` function, allowing other classes to retrieve the texture color at a given UV coordinate.

`model.h` defines the `Model` class, which can read `.obj` model files and load their data (vertices, faces, texture coordinates, etc.) into memory.

```cpp
struct Texture {
    int width = 0;
    int height = 0;
    std::uint8_t bpp = 0;
    std::vector<std::uint8_t> data = {};

    Texture() = default;
    Texture(const int _width, const int _height, const std::uint8_t _bpp)
        : width(_width), height(_height), bpp(_bpp), data(_width * _height * _bpp) {}

    Color get_color(const int x, const int y) const {
        if (data.empty() || x < 0 || y < 0 || x >= width || y >= height) {
            std::cerr << "get pixel fail: x " << x << " y " << y << "\n";
            return {};
        }

        Color ret = {0, 0, 0, 0};
        const std::uint8_t *pixel = data.data() + (x + y * width) * bpp;
        std::copy_n(pixel, bpp, ret.bgra.begin());
        return ret;
    }

    Color get_color(const Vec2& uv) const {
        return get_color(static_cast<int>(uv[0] * width), static_cast<int>(uv[1] * height));
    }

    void flip_horizontally() {
        const int half = width >> 1;
        for (int x = 0; x < half; ++x)
            for (int y = 0; y < height; ++y)
                for (int b = 0; b < bpp; ++b)
                    std::swap(data[(x + y * width) * bpp + b],
                              data[(width - 1 - x + y * width) * bpp + b]);
    }

    void flip_vertically() {
        const int half = height >> 1;
        for (int x = 0; x < width; ++x)
            for (int y = 0; y < half; ++y)
                for (int b = 0; b < bpp; ++b)
                    std::swap(data[(x + y * width) * bpp + b],
                              data[(x + (height - 1 - y) * width) * bpp + b]);
    }
};
```

- **`renderer.h`**

This file defines the `Renderer` class, which is the core of the program. It contains the main rendering algorithms, such as line drawing, barycentric coordinate calculation, and triangle rasterization.

The image color data is stored in a `vector<uint8_t>` named `frame_buffer`, which is a low-level format intended to facilitate future development. I use `bpp` (bits per pixel) as an offset for storing and indexing pixel colors.

```cpp
void set_model_mat(double angle, double scale, const Vec3 &translate);
void set_view_mat(const Vec3& eye_point);
void set_projection_mat(double fov, double aspect_ratio, double zNear, double zFar);
void set_viewport_mat(int x, int y, int w, int h);

class Renderer {
public:
    Renderer() = default;
    Renderer(int width, int height, int bbp);

    Color get_pixel(int x, int y) const;
    void set_pixel(int x, int y, const Color &color);
    void draw_line(Vec2 p0, Vec2 p1, const Color &color);
    void draw_triangle_linesweeping(Vec2 p0, Vec2 p1, Vec2 p2, const Color &color);
    void draw_object(const Object &object, IShader &shader);

    int width() const { return width_; }
    int height() const { return height_; }
    std::uint8_t bpp() const { return bpp_; }
    auto frame_data() const { return frame_buffer_.data(); }
    auto& frame_buffer() { return frame_buffer_; }
    auto depth_data() const { return depth_buffer_.data(); }
    auto& depth_buffer() { return depth_buffer_; }
private:
    void draw_triangle(const Mat<3, 4> &t_vert_clip, IShader &shader);

    static Vec3 get_barycentric2D(const std::array<Vec2, 3> &t_vert, const Vec2& p);
    static bool is_inside_triangle_cross_product(const Vec2 *t, const Vec2& P);

    int width_ = 0;
    int height_ = 0;
    std::uint8_t bpp_ = 0; // bits per pixel
    std::vector<std::uint8_t> frame_buffer_ = {};
    std::vector<double> depth_buffer_ = {};
};
```

- **`shader.h`**

This is a collection of rendering-related classes and methods, including utilities like `Object` and `Camera`. It also defines the base `IShader` interface, which serves as the parent class for all custom shaders.

```cpp
struct Camera {
    Vec3 position;
    double fov;
    double aspect_ratio;
    double zNear;
    double zFar;

    Camera(const Vec3& position, double fov, double aspect_ratio, double zNear, double zFar)
            : position(position), fov(fov), aspect_ratio(aspect_ratio), zNear(zNear), zFar(zFar) {}
};

struct Object {
    const Model model;
    Vec3 position;
    double angle;
    double scale;

    Object(const std::string &model_path, const Vec3 &position, const double angle, const double scale)
            : model(Model(model_path)), position(position), angle(angle), scale(scale) {}
};

struct Light {
    Vec3 direction;
    Vec3 intensity;
};

struct IShader {
    virtual ~IShader() = default;

    explicit IShader(const Model &model, std::vector<Light>&& lights = std::vector<Light>())
        : model_(model), lights_(std::move(lights)) {
    }

    virtual void start() { }
    virtual void vertex(int i_face, int nth_vert, Vec4 &ret_vert) = 0;
    virtual bool fragment(const Vec3 &bc, Color& ret_color) = 0;

protected:
    const Model& model_;
    std::vector<Light> lights_;
};
```

- **`tga-handler.h`**

This is a static utility for reading and writing TGA images. It supports both uncompressed and RLE-compressed TGA files.

Run-Length Encoding (RLE) is a simple and efficient data compression algorithm, particularly effective for data with many repeating elements. The basic idea of RLE is to replace consecutive occurrences of the same data value with a single value and a count.

For example, the string "AAAABBBCCDAA" could be compressed using RLE to "4A3B2C1D2A". Here, "4A" means the letter 'A' appears four times in a row, "3B" means 'B' appears three times, and so on.

```cpp
// standard TGA header
#pragma pack(push, 1)
struct TGAHeader {
    std::uint8_t  id_length = 0;
    std::uint8_t  color_map_type = 0;
    std::uint8_t  data_type_code = 0;
    std::uint16_t color_map_origin = 0;
    std::uint16_t color_map_length = 0;
    std::uint8_t  color_map_depth = 0;
    std::uint16_t x_origin = 0;
    std::uint16_t y_origin = 0;
    std::uint16_t width = 0;
    std::uint16_t height = 0;
    std::uint8_t  bits_per_pixel = 0;
    std::uint8_t  image_descriptor = 0;
};
#pragma pack(pop)

class TGAHandler {
public:
    TGAHandler() = delete;

    static Texture read_tga_file(const std::string& filename);
    static bool write_tga_file(const std::string &filename, int width, int height, std::uint8_t bpp, const unsigned char *data, bool v_flip = false, bool rle = true);
private:
    static bool load_rle_data(std::ifstream &in, Texture &texture);
    static bool unload_rle_data(std::ofstream &out, int width, int height, std::uint8_t bpp, const unsigned char *data);
};
```

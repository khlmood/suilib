#ifndef SRC_TEXTURE_H_
#define SRC_TEXTURE_H_

#include <nan.h>

#include <SFML/Graphics/Texture.hpp>

namespace node_sfml {
namespace texture {

class Texture : public Nan::ObjectWrap {
 public:
  static NAN_MODULE_INIT(Init);

 public:
  static NAN_METHOD(New);
  static NAN_METHOD(LoadFromFile);
  static NAN_METHOD(GetSize);

  // Update family
  static NAN_METHOD(UpdateByTexture);

  inline const sf::Texture& texture() const { return _texture; }
  inline sf::Texture& mutable_texture() { return _texture; }
  inline void SetLoading(bool loading) { _loading = loading; }

 private:
  Texture();
  explicit Texture(const Texture& src);
  virtual ~Texture();

 private:
  sf::Texture _texture;
  bool _loading;
};

}  // namespace texture
}  // namespace node_sfml

#endif  // SRC_TEXTURE_H_

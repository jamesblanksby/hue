# Hue

This project is WIP.

> An online resource to convert & compare CSS color formats.

## Usage

### Conversion
Colors can be converted instantly to and from named (where applicable), hex, rgb and hsl. This can be done either by using the input box or by using following url syntax: `http://<URL>/{ COLOR }`. A limitation of the latter method is that it only supports color conversion from hex values and the color must be entered without the preceding hash.

<img src="http://i.imgur.com/QbAewTG.gif" alt="CSS color conversion" width="700">

### Comparison
Comparing or making a palette of colors is done much the same as conversion except instead of using one hex value, you may use multiple, for example: `http://<URL>/{ COLOR 1}/{ COLOR2 }/{ COLOR3 }`. There is no programmatic limit to the amount of colors you can use but depending on the size of your monitor you may find the UI starts to double up on itself. Like before, this method only supports color comparison from hex values and the color must be entered without the preceding hash.
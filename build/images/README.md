# Imágenes de Donaciones

## QR de Yape

Para agregar tu QR de Yape al modal de donaciones:

1. **Guarda tu imagen QR** en esta carpeta (`public/images/`) con el nombre `yape-qr.png` o `yape-qr.jpg`
2. **Asegúrate** de que la imagen tenga un buen contraste y sea legible
3. **Tamaño recomendado**: 200x200 píxeles o similar (cuadrada)

### Ejemplo de uso:
```jsx
// En el componente Header.jsx, reemplaza el placeholder con:
<img
  src="/images/yape-qr.png"
  alt="QR de Yape"
  className="donate-qr-image"
/>
```

### Estilos CSS recomendados para la imagen:
```css
.donate-qr-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

¡Recuerda que el QR debe estar actualizado y ser válido para recibir donaciones!
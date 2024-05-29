# Food Ordering App

Este repositorio contiene el código fuente de una aplicación de ordenamiento de comida desarrollada con React Native y Expo, que ofrece una experiencia completa para usuarios y administradores. Aquí se detallan las características principales de esta aplicación:


## Características clave para usuarios

- **Exploración del menú**: Sumérgete en una amplia selección de deliciosos platos y bebidas. Cada producto viene con una descripción detallada, precio y opción para agregar al carrito.
- **Gestión del carrito**: Agrega, modifica o elimina productos fácilmente en tu carrito de compras. ¡Haz ajustes rápidos antes de finalizar tu pedido!
- **Proceso de pago seguro**: Utilizamos la pasarela de pagos de Stripe para garantizar transacciones seguras y proteger la información financiera de nuestros usuarios.
- **Actualización en tiempo real**: Recibe notificaciones push y actualizaciones en tiempo real sobre el estado de tu pedido.
  

## Características específicas para administradores

Los administradores tienen acceso a un conjunto completo de herramientas para gestionar eficazmente el contenido de la aplicación:

- **Control total del menú**: Agrega, edita o elimina productos del menú con facilidad. Actualiza información como nombre, precio e imagen para mantener el menú fresco y atractivo.
- **Gestión de órdenes**: Visualiza todas las órdenes pendientes y archivadas, y actualiza el estado de las órdenes según sea necesario. Mantén un registro organizado y actualizado de todas las transacciones.
- **Notificaciones en tiempo real**: Recibe notificaciones push instantáneas sobre nuevas órdenes y cambios en el estado de las órdenes.
  

## Funcionalidades avanzadas con Supabase

La aplicación se integra perfectamente con Supabase para ofrecer características avanzadas y un rendimiento óptimo:

- **Gestión de datos en tiempo real**: Disfruta de actualizaciones en tiempo real para el estado de tus pedidos y notificaciones instantáneas sobre cualquier cambio relevante.
- **Almacenamiento de imágenes**: Las imágenes de los productos se almacenan de forma segura en el bucket `Product-images`, lo que garantiza una experiencia visual atractiva para los usuarios.
  

## Tecnologías y dependencias principales

- **React Native**: 0.74.1
- **Expo**: 51.0.9
- **React Navigation**: 6.0.2
- **Stripe React Native**: 0.37.2
- **Supabase JS**: 2.43.2
- **React Query**: 5.37.1
  

## Estructura de la base de datos Supabase

Nuestra aplicación utiliza una estructura de base de datos organizada en Supabase para gestionar eficazmente los datos relacionados con los productos, órdenes y perfiles de usuario. La siguiente es la estructura de la base de datos:

- **order_items**: [Order_items Schema](https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/Supabase-Schemas/Order-items.png)
- **orders**: [Orders Schema](https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/Supabase-Schemas/Orders.png)
- **products**: [Products Schema](https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/Supabase-Schemas/Products.png)
- **profiles**: [Profiles Schema](https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/Supabase-Schemas/Profile.png)

Las imágenes de los productos se almacenan en el bucket `Product-images`: [Product-images Bucket](https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/Supabase-Schemas/Product-images.png)


## Configuración y variables de entorno

Es esencial configurar correctamente las variables de entorno en el archivo `.env.local` para garantizar el funcionamiento adecuado de la aplicación:

- **EXPO_PUBLIC_SUPABASE_URL**=tu_url_de_supabase
- **EXPO_PUBLIC_SUPABASE_KEY**=tu_clave_de_supabase
- **EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY**=tu_clave_publica_de_stripe
- **STRIPE_SECRET_KEY**=tu_clave_secreta_de_stripe

Asegúrate de reemplazar `tu_url_de_supabase`, `tu_clave_de_supabase`, `tu_clave_publica_de_stripe` y `tu_clave_secreta_de_stripe` con tus propias credenciales.


### Despliegue de función Supabase

Utiliza Supabase CLI o la interfaz web para desplegar la función `payment-sheet` en tu instancia de Supabase. Sigue las instrucciones proporcionadas en la documentación para este paso.


## Instrucciones de instalación y uso

### Clonar el repositorio

1. Clona este repositorio en tu máquina local:
    ```sh
    git clone "https://github.com/JairGuzman1810/food-ordering-app"
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd nombre_del_directorio
    ```

### Instalar dependencias

1. Navega al directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:
    ```sh
    npm install
    ```

2. O si prefieres usar yarn:
    ```sh
    yarn install
    ```

### Ejecutar la aplicación

1. Una vez que hayas configurado las variables de entorno y desplegado la función en Supabase, puedes ejecutar la aplicación utilizando el siguiente comando:
    ```sh
    expo start
    ```

### Explorar y disfrutar
Abre la aplicación en tu emulador de dispositivo móvil o en tu propio dispositivo utilizando la aplicación Expo Go. Explora el menú, realiza pedidos y disfruta de la experiencia completa de nuestra aplicación de ordenamiento de comida.

## Capturas de pantalla de la aplicación
<div style="display:flex; flex-wrap:wrap; justify-content:space-between;">
    <img src="https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/App-Photos/App-2.jpeg" alt="Captura de pantalla 2" width="180"/>
    <img src="https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/App-Photos/App-3.jpeg" alt="Captura de pantalla 3" width="180"/>
    <img src="https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/App-Photos/App-4.jpeg" alt="Captura de pantalla 4" width="180"/>
    <img src="https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/App-Photos/App-5.jpeg" alt="Captura de pantalla 5" width="180"/>
</div>
<div style="display:flex; flex-wrap:wrap; justify-content:space-between;">
    <img src="https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/App-Photos/App-6.jpeg" alt="Captura de pantalla 6" width="180"/>
    <img src="https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/App-Photos/App-7.jpeg" alt="Captura de pantalla 7" width="180"/>
    <img src="https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/App-Photos/App-8.jpeg" alt="Captura de pantalla 8" width="180"/>
    <img src="https://github.com/JairGuzman1810/food-ordering-app/blob/master/github/App-Photos/App-9.jpeg" alt="Captura de pantalla 9" width="180"/>
</div>


set -e
set -x
# Vérifier si l'image existe avant de la supprimer
IMAGE_NAME=$FULTANG_IMAGE
if sudo docker images -q "$IMAGE_NAME" | grep -q .; then
    sudo docker rmi -f "$IMAGE_NAME"
else
    echo "L'image $IMAGE_NAME n'existe pas."
fi

sudo docker compose -f ./docker-compose.yml down
sudo docker login ghcr.io -u $NAMESPACE -p $PERSONAL_ACCESS_TOKEN
sudo docker pull $FULTANG_IMAGE
sudo docker compose -f ./docker-compose.yml up -d
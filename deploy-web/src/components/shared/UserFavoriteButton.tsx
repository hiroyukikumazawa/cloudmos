"use client";
import React, { ReactNode, useState } from "react";
import { useAddFavoriteTemplate, useRemoveFavoriteTemplate } from "@src/queries/useTemplateQuery";
import { useCustomUser } from "@src/hooks/useCustomUser";
import { MustConnectModal } from "./MustConnectModal";
import { Button } from "../ui/button";
import Spinner from "./Spinner";
import { MdStar, MdStarOutline } from "react-icons/md";
import { cn } from "@src/utils/styleUtils";
import { useSnackbar } from "notistack";
import { Snackbar } from "./Snackbar";

type Props = {
  id: string;
  isFavorite: boolean;
  children?: ReactNode;
  onAddFavorite?: () => void;
  onRemoveFavorite?: () => void;
};

export const UserFavoriteButton: React.FunctionComponent<Props> = ({ id, isFavorite: _isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const { user } = useCustomUser();
  const [isFavorite, setIsFavorite] = useState(_isFavorite);
  const { mutate: addFavorite, isLoading: isAdding } = useAddFavoriteTemplate(id);
  const { mutate: removeFavorite, isLoading: isRemoving } = useRemoveFavoriteTemplate(id);
  const [showMustConnectModal, setShowMustConnectModal] = useState(false);
  const isSaving = isAdding || isRemoving;
  const { enqueueSnackbar } = useSnackbar();

  const onFavoriteClick = async () => {
    try {
      if (isSaving) return;
      if (!user) {
        setShowMustConnectModal(true);
        return;
      }

      if (isFavorite) {
        await removeFavorite();
        onRemoveFavorite && onRemoveFavorite();
      } else {
        await addFavorite();
        onAddFavorite && onAddFavorite();
      }

      setIsFavorite(prev => !prev);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(<Snackbar title="An error has occured." iconVariant="error" />, {
        variant: "error"
      });
    }
  };

  return (
    <>
      {showMustConnectModal && <MustConnectModal message="To add template favorites" onClose={() => setShowMustConnectModal(false)} />}
      <Button size="icon" onClick={onFavoriteClick} variant="ghost" className={cn({ ["text-primary"]: isFavorite }, "text-xl")}>
        {isSaving ? <Spinner size="small" /> : isFavorite ? <MdStar /> : <MdStarOutline />}
      </Button>
    </>
  );
};

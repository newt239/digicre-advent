"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalendarEntry } from "@/app/actions";
import { saveEntry, deleteEntry } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type EntryDialogProps = {
  selectedDay: number | null;
  selectedPage: 1 | 2;
  onClose: () => void;
  existingEntry?: CalendarEntry;
};

export function EntryDialog({
  selectedDay,
  selectedPage,
  onClose,
  existingEntry,
}: EntryDialogProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (existingEntry) {
      setName(existingEntry.name);
      setTitle(existingEntry.title);
      setUrl(existingEntry.url || "");
    } else {
      setName("");
      setTitle("");
      setUrl("");
    }
  }, [existingEntry, selectedDay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay && name && title) {
      setIsSubmitting(true);

      const result = await saveEntry({
        day: selectedDay,
        page: selectedPage,
        name,
        title,
        url: url || "",
      });

      setIsSubmitting(false);

      if (result.success) {
        router.refresh();
        onClose();
      } else {
        alert("保存に失敗しました: " + (result.error || "不明なエラー"));
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedDay || !existingEntry) return;

    const confirmed = window.confirm(
      `12月${selectedDay}日 Page ${selectedPage} の記事を削除してもよろしいですか？`
    );
    if (!confirmed) return;

    setIsDeleting(true);

    const result = await deleteEntry(selectedDay, selectedPage);

    setIsDeleting(false);

    if (result.success) {
      router.refresh();
      onClose();
    } else {
      alert("削除に失敗しました: " + (result.error || "不明なエラー"));
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={selectedDay !== null} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            12月{selectedDay}日の記事を登録
          </DialogTitle>
          <DialogDescription>
            投稿者名、記事タイトル、URLを入力してください
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">投稿者名 *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Neo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">記事タイトル *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="万博に行ってきた話"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">記事URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
            />
          </div>

          <div className="flex gap-3 pt-4">
            {existingEntry && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isSubmitting || isDeleting}
                className="gap-2"
                aria-label="記事を削除"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "削除中..." : "削除"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isSubmitting || isDeleting}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting || isDeleting}
            >
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}



import { FileText, FileArchive, File, Upload } from "lucide-react";

function LearningResources({
  files,
  editable = false,
  onUploadFiles,
  onRemoveFile,
}) {
  
  if (!editable) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-5 min-h-[280px]">
        <h2 className="font-semibold text-sm text-gray-900">
          Learning resources
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          Attach files and supporting materials.
        </p>

        {files.length === 0 ? (
          <p className="text-xs text-gray-400 mt-6">
            No resources uploaded yet.
          </p>
        ) : (
          <div className="space-y-5 mt-6">
            {files.map((file) => {
              const Icon =
                file.type === "PDF"
                  ? FileText
                  : file.type === "ZIP"
                    ? FileArchive
                    : File;

              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                    <Icon size={14} />
                  </div>

                  <p className="text-xs font-medium">
                    {file.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h2 className="font-semibold text-sm">
        Attach resources
      </h2>

      <p className="text-xs text-gray-400 mt-1">
        Add files learners can download.
      </p>

      <label className="mt-5 flex flex-col items-center justify-center bg-violet-50 rounded-lg p-7 cursor-pointer hover:bg-violet-100">
        <Upload
          size={20}
          className="text-violet-600 mb-2"
        />

        <span className="text-xs text-violet-600 font-medium">
          + Upload resource
        </span>

        <span className="text-[10px] text-gray-400 mt-2">
          PDF, PPT, ZIP · Max 25 MB
        </span>

        <input
          type="file"
          multiple
          onChange={onUploadFiles}
          className="hidden"
        />
      </label>

      <h3 className="text-xs font-semibold mt-6 mb-4">
        Attached files
      </h3>

      {files.length === 0 ? (
        <p className="text-xs text-gray-400">
          No files attached yet.
        </p>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center text-[9px] shrink-0">
                  {file.type}
                </span>

                <p className="text-xs text-gray-700 truncate">
                  {file.name}
                </p>
              </div>

              <button
                onClick={() => onRemoveFile(file.id)}
                className="text-xs text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LearningResources;

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TicketForm;
use App\Models\DynamicOption;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    public function Support()
    {
        $tickets = TicketForm::all();
        return Inertia::render('Support', [
            'tickets' => $tickets,
        ]);
    }

    // Method to get all dynamic options
    public function getDynamicOptions()
    {
        $options = DynamicOption::all();
        return response()->json($options);
    }

    public function updateStatus(Request $request, $ticketId)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:pending,canceled,complete',
            'statusMessage' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the ticket
        $ticket = TicketForm::find($ticketId);

        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket not found',
            ], 404);
        }

        try {
            // Update the ticket
            $ticket->update([
                'status' => $request->input('status'),
                'message' => $request->input('statusMessage'),
            ]);

            return response()->json([
                'message' => 'Ticket status updated successfully',
                'ticket' => $ticket,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update ticket status: ' . $e->getMessage(),
            ], 500);
        }
    }

    // Method to store a new dynamic option
    public function storeDynamicOption(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'department' => 'required|string',
            'priority' => 'required|string',
            'services' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $dynamicOption = DynamicOption::create([
            'department' => $request->department,
            'priority' => $request->priority,
            'services' => $request->services,
        ]);

        return response()->json(['message' => 'Option added successfully', 'data' => $dynamicOption], 201);
    }

    // Method to update an existing dynamic option
    public function updateDynamicOption(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'department' => 'required|string',
            'priority' => 'required|string',
            'services' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $option = DynamicOption::find($id);
        
        if (!$option) {
            return response()->json(['message' => 'Option not found'], 404);
        }

        $option->update([
            'department' => $request->department,
            'priority' => $request->priority,
            'services' => $request->services,
        ]);

        return response()->json(['message' => 'Option updated successfully', 'data' => $option]);
    }

    // Method to delete a dynamic option
    public function deleteDynamicOption($id)
    {
        $option = DynamicOption::find($id);
        
        if (!$option) {
            return response()->json(['message' => 'Option not found'], 404);
        }

        $option->delete();
        
        return response()->json(['message' => 'Option deleted successfully']);
    }
}